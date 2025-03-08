const userSchema = require("../Models/UserSchema")
const blogSchema = require("../Models/BlogSchema");
const Read =  require("../DatabaseControllers/read")
const { default: mongoose } = require("mongoose");

class Create{

            async createOneUser(user, next) {
                const ReadController = new Read(); 
                const session = await mongoose.startSession()
                session.startTransaction();
                
                if(!user){
                    throw new Error("No user provided");
                }
                
            try {  
                    const existingUser = await ReadController.getUserByEmail(user.email)

                    if(existingUser){
                        const userAlreadyExists =
                        new Error(`User already exists with email ${user.email} try logging in`)
                        userAlreadyExists.statusCode = 401
                        throw userAlreadyExists;}
                
                    const signedPassword = require("../utils/utils").hashPassword(user.password)
                    user.password = signedPassword
                    const userData = new userSchema(user);

                    const savedUser = await userData.save({session})

                    await session.commitTransaction();
                    session.endSession();
                    return savedUser
                } catch (error) {  

                    await session.abortTransaction();
                    session.endSession();
                    
                    if (next) {
                      return next(error);
                    }
                    throw error;
                }}


                async createGoogleUser(user, done) {
                    const {providerId, provider} = user
                    const ReadController = new Read(); 
                    const session = await mongoose.startSession()
                    session.startTransaction();

                    if(!user){
                       throw new Error("No user provided");}

                    if(!providerId && provider !== "google" ){
                       throw new Error("User not valid");}
        
                    
                try {  
                    const existingUser = await ReadController.getUserByEmail(user.email)
    
                        if(existingUser){
                            return done(null, existingUser)
                        }
                    
                    const userData = new userSchema(user);
                    const savedUser = await userData.save({session})

                        await session.commitTransaction();
                        session.endSession();
                       
                    return done(null, savedUser);
                    } catch (error) {  
    
                        await session.abortTransaction();
                        session.endSession();
                        
                        if (done) {
                        done(error,null)
                        }throw error;}}
                    
                    

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