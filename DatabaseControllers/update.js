
const userSchema = require("../Mongoose/UserSchema")
const blogSchema = require("../Mongoose/BlogSchema")

class Update{

      
            async linkBlogToUser(blogData, userId){
           
            try {
            const blog = await blogSchema.findOne({blogTitle : blogData.blogTitle , author : blogData.author ,blogBody :blogData.blogBody})
            const user = await userSchema.findOne({ _id : userId})
            
            if(!user){console.log("No user to start with")}
            if(!blog){console.log("No blog to start with")}

            if(blog && user){
                console.log({blog,user})
                user.blogs.push(blog._id)
                user.save()
                console.log("Blogs linked succesfullly")
            }
           } catch (error) {
            console.log(error)
           }

        }

}





module.exports = Update