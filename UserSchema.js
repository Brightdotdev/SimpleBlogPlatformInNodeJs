const mongoose = require("mongoose");

const urlValidator = (platform) => ({
    type: String,
    match : [ new RegExp(`^(https?:\/\/)?(www\.)?${platform}\.com\/[A-Za-z0-9-._~%&?=+#]*$`) , `That's not a valid ${platform} url` ]
})

const userSchema = mongoose.Schema({
    fullNname : {
        type : String,
         required : [true, "Your name is needed for registration is required"],
     },

    email : {
       type : String,
        required : [true, "User email is required"],
        unique : true,
        lowercase : true,
        match : [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    userName : {
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
        required : [true, "Your blog's username is required"],
        min : [8, "Your password cant be less than eight letters"]
     },
     bloggingStyle : {
        type : String,
        required : [true, "Your bloging style is required"],
        enum :{ 
            values : ["writer", "Reader", "Both"],
            message : '{VALUE} is not a valid blogging style'
        },
        required : true
     },
     socialLinks : {
        linkedIn : urlValidator("linkedin"),
        instagram : urlValidator("instagram"),
        facebook : urlValidator("facebook")
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
    blogs : [
        {type : mongoose.Types.ObjectId, ref : "Blogs" }
    ]
})




module.exports = mongoose.model("users", userSchema)