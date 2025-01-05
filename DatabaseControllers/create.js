const userSchema = require("../Mongoose/UserSchema")
const blogSchema = require("../Mongoose/BlogSchema")

class Create{

            async createOneUser(user) {
                if(!user) return console.log("no user found")
                
                    try {    
                    const userData = new userSchema(user);
                    console.log("Data accepted succcesfully")
                  
                    return await userData.save()
                } catch (error) {
                    console.log("Error creating user")
                    console.log(error.message)
                }
            }

            async createBlog(blog) {
                try {
                    if(blog){
                    const blogData = new blogSchema(blog);
                    await blogData.save()
                    console.log("Blog data accepted succcesfully")
                    }else{
                        console.log("No blog identified")
                        retun
                    }

                } catch (error) {
                    console.log("Error creating blog")
                    console.log(error.message)}}}



        module.exports = Create