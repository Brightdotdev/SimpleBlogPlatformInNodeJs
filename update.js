
const userSchema = require("./UserSchema")
const blogSchema = require("./BlogSchema")
const {connectToDatabase} = require("./utils")

class Update{

    constructor(){
        this.initializeDatabaseConnection()
    }

    async initializeDatabaseConnection() {
        try{
            await connectToDatabase();
            console.log("Connected from the update class")
        }catch(err){
            console.log("Error connceting to database")
            console.log(err.message)}}

      
            async linkBlogToUser(blogData, userId){
           
            try {
            await this.initializeDatabaseConnection();
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