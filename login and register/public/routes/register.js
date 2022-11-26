const express=require("express");
const router=express.Router();
const userdata=require("../model/userdata")
const asyncHandler = require("express-async-handler");
router.post("/register",async (req,res)=>{
    const {name,username,email,password,age} =req.body;
    userdata.findOne({ username: username }).then(async response => {
        if (!response) {
             
                    const user = new data({
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                        age:age
                    })
           const data= await  userdata.save();
              
        }
        else {
            res.json("user exist already");
        }
    }).catch(err => {
        console.log(err);
    })
})