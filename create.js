const userSchema = require("./UserSchema")
const blogSchema = require("./BlogSchema")
const {connectToDatabase} = require("./utils")

class Create{

    constructor() {    
            this.initializeDatabaseConnection()
    }

            async initializeDatabaseConnection() {
                try{
                    await connectToDatabase();
                    console.log("Connected from the create class")
                }catch(err){
                    console.log("Error connceting to database")
                    console.log(err.message)
            
                }
            }

            async createOneUser(user) {
                try {
                    if(user){
                    await this.initializeDatabaseConnection();
                    const userData = new userSchema(user);
                    await userData.save()
                    console.log("Data accepted succcesfully")
                    }else{
                        console.log("No user identified")
                        retun
                    }

                } catch (error) {
                    console.log("Error creating user")
                    console.log(error.message)
                }
            }

            async createBlog(blog) {
                try {
                    if(blog){
                    await this.initializeDatabaseConnection();
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