const mongoose = require("mongoose");
const {urlValidator} = require("../utils/utils")


const userSchema = mongoose.Schema({
    fullname : {
        type : String,
         required : [true, "Your name is needed for registration "],
     },

    email : {
       type : String,
        required : [true, "User email is required"],
        unique : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    username : {
        type : String,
         required : [true, "Your blog's username is required"],
         unique : true,
         min : [3, "Your username cant be less than three letters"],
         max : [15, "Your username cant be higher than fifteen letters"],
         match : [/^[a-zA-Z0-9][a-zA-Z0-9_\-.]{1,14}[a-zA-Z0-9]$/
, "Please enter a valid username"],
     },
     password : {
        type : String,
      /*   required : [true, "Your blog's password is required"], */
        min : [8, "Your password cant be less than eight letters"]
     },
     bloggingStyle : {
        type : String,
    /*     required : [true, "Your bloging style is required"],*/
        enum :{ 
            values : ["writer", "reader", "both"],
            message : '{VALUE} is not a valid blogging style'
        } 
     },
     socialLinks : {
        linkedIn : urlValidator("linkedin"),
        instagram : urlValidator("instagram"),
        facebook : urlValidator("facebook")
    },
    blogs : [
        {type : mongoose.Types.ObjectId, ref : "Blogs" }
    ],
    userImage :{
        type : String
    },
    provider : {
        type : String,
        default : "localAuthentication"
    },
    providerId : {
        type : String},
    isNewUser : {
        type : Boolean,
         default : true
    },
    isFromExternalAuthentication : {
        type : Boolean,
         default : false
    }
},{timestamps : true})

module.exports = mongoose.model("users", userSchema)