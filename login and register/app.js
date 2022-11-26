const express=require("express")
const mongoose =require("mongoose")
const app=express()
const userdata=require("./public/model/userdata")
const asyncHandler = require("express-async-handler");
const bodyParse=require("body-parser")
const register = require("./public/routes/register");
const bcrypt=require("bcryptjs")
// const HospitalReq=require("./routes/HospitalRequest")
// const patient=require("./routes/Patient")
//middleware that parse the json
app.use(express.json())

app.get("/register",(req,res)=>{
  res.json("hello")
})
app.post("/register",async (req,res)=>{
    const {name,username,email,password,age} =req.body;
    userdata.findOne({ username: username }).then(async response => {
        if (!response) {
                await bcrypt.hash(password, 12).then(password => {
                    const user = new userdata({
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                        age:age
                    })
                 user.save((err, doc) => {
                        if (err) throw err;
                        res.json("data registration success");
                    });
                }).catch(err => {
                    console.log(err);
                });
        }
        else {
            res.json("user exist already");
        }
    }).catch(err => {
        console.log(err);
    })
})
app.post("/login",async (req,res)=>{
    try {
        const { username, password } = req.body;
        const result = await userdata.findOne({ username: username });
        if (result) {
            bcrypt.compare(password, result.password).then(domatch => {
                console.log(domatch);
                if (domatch) {
                    // generate token we get token that will consist of userid in payload
                    console.log("login success")
                    res.json("login success")
                }
                else {
                   res.json("please try again")
                }
            })
        }
        else {
            res.json("please try again")
        }
    }
    catch (err) {
        res.json("please try again")
    }
})
mongoose
.connect("mongodb://localhost:27017/ManasData", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
  })
  .catch((err) => {
    console.log(err);
});

app.listen(8000);
console.log("server started");