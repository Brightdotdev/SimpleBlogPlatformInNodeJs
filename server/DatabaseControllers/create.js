const userSchema = require("../Models/UserSchema")
const blogSchema = require("../Models/BlogSchema")

class Create{

            async createOneUser(user) {
                if(!user){
                    throw new Error("No user provided");
                }
            
                    try {    
                    const signedPassword = require("../utils/utils").hashPassword(user.password)
                    user.password = signedPassword
                    const userData = new userSchema(user);
                    return await userData.save()
                } catch (error) {
                    console.log("Error creating user")
                    console.log(error.message)}}

                    
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