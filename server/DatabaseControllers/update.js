
const userSchema = require("../Models/UserSchema")
const blogSchema = require("../Models/BlogSchema")
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


        async updateUserDataFromPassport(userData){
           
            try {
            if(!userData) throw new Error("No data to update")
            
            const {userId,bloggingStyle, password, socialLinks} = userData
            
            const user = await userSchema.findOne({ providerId : userId})
            if(!user) throw new Error("No user to start with")
            

            if(!password) throw new Error("No password to update")    
            const hashedPassword = require("../utils/utils").hashPassword(password)
            
            user.password  = hashedPassword
            if(bloggingStyle) user.bloggingStyle  = bloggingStyle
            if(socialLinks) user.socialLinks  = socialLinks
            user.isNewUser = false
            
            console.log("yeah this is your verification")

             await user.save()
       }catch (error){console.log(error)}}}





module.exports = Update