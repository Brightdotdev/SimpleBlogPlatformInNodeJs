const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    blogTitle : {
        type : String,
         required : [true, "Your blog title is needed"]
     },
     blogBody : {
        type : String,
         required : [true, "Your blog is needed"]
     },
     status  : {
        type : String,
        lowercase : true,
        enum : {
            values : ["pending","published"] ,
            message :  "Blogs can only be pending or published"
        }  
    } ,
    createdAt : {
        type : Date,
        immutable : true,
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
    author : { type : mongoose.Types.ObjectId, ref : "users", required : true },
    comments : [{ 
    commenter :{ type : mongoose.Types.ObjectId, ref : "users", required : true },
    comment : { type : String, required : true}
}
],
    likes :[{ type : mongoose.Types.ObjectId, ref : "users", required : true }],
    blogTags :[{ type : String }],

})




module.exports = mongoose.model("blogs", blogSchema)