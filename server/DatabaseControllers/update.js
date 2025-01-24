
const userSchema = require("../Mongoose/UserSchema")
const blogSchema = require("../Mongoose/BlogSchema")
const { use } = require("passport")

class Update{

            async linkBlogToUser(blogData, userId){
           
            try {
            const blog = await blogSchema.findOne({blogTitle : blogData.blogTitle , author : blogData.author ,blogBody :blogData.blogBody})
            const user = await userSchema.findOne({ _id : userId})
            
            if(!user){console.log("No user to start with")}
            if(!blog){console.log("No blog to start with")}

            if(blog && user){
                console.log({blog,user})
               await user.blogs.push(blog._id)
               await  user.save()
                console.log("Blogs linked succesfullly")
            }} catch (error) {console.log(error)}}


        async updateUserDataFromPassport(userData, userId){
           
            try {
            const user = await userSchema.findOne({ _id : userId})
            const {bloggingStyle, password, socialLinks } = userData
            
            if(!user) return console.log("No user to start with")
            if(!userData) return console.log("No userData to start with")
             
            
            if(password) {
            const hashedPassword = require("../utils/utils").hashPassword(password)
            user.password  = hashedPassword}


            if(bloggingStyle) user.bloggingStyle  = bloggingStyle
            if(socialLinks) user.socialLinks  = socialLinks

             user.isNewUser = false
             await user.save()
       }catch (error){console.log(error)}}}





module.exports = Update