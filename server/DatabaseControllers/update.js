
const userSchema = require("../Models/UserSchema")
const blogSchema = require("../Models/BlogSchema")
const { use } = require("passport")
const { default: mongoose } = require("mongoose")

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


        async updateUserDataFromPassport(userData,next){
           const session = await mongoose.startSession()
            
           try {
            session.startTransaction()
            if(!userData) throw new Error("No data to update")
            console.log("data from  the uppdate controller " ,   userData)

            const {id,bloggingStyle, password, email} = userData
            const user = await userSchema.findOne({ providerId : id, email})
           
            if(!user) throw new Error("No user to start with")
            if(!password) throw new Error("No password to update")    
            if(!bloggingStyle) throw new Error("You have to be a blogger or writter")

            
            const hashedPassword = require("../utils/utils").hashPassword(password)
            
            user.password  = hashedPassword
            user.bloggingStyle  = bloggingStyle
            user.isNewUser = false

            const updatedData =  await user.save()
            console.log("yeah this is your verification")
            session.commitTransaction()
            session.endSession()
            return updatedData
       }catch (error){
        
        await session.abortTransaction();
        session.endSession();

        if(next){
            return next(error)
        }
        throw error
       }}}





module.exports = Update