const userSchema = require("../Mongoose/UserSchema")
const blogSchema = require("../Mongoose/BlogSchema")

class Create{

            async createOneUser(user) {
                if(!user) return console.log("no user found")
                
                    try {    
                    const userData = new userSchema(user);
                     return await userData.save()
                } catch (error) {
                    console.log("Error creating user")
                    console.log(error.message)
                }
            }

            async createBlog(blog) {
                try {
                    if(!blog) 
                    return console.log("No blog identified")

                    const blogData = new blogSchema(blog);
                    return await blogData.save()

                } catch (error) {
                    console.log("Error creating blog")
                    console.log(error.message)}}}



        module.exports = Create