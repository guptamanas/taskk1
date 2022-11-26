const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = Schema({
    name: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String
    },
    age: {
        type: String,
        default: "",
    }
},);
const Data = mongoose.model("userdata", schema);
module.exports = Data;