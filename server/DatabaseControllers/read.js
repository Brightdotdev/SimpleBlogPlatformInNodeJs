const userSchema = require("../Models/UserSchema")
const blogSchema = require("../Models/BlogSchema")

class Read{

    async getAllBlogs(){
        try{
            
            const userData = await blogSchema.find({})
         return userData
        }catch(e){
            console.log(e.message)
        }} 

        async getOneBlog(data){
            try{
                
                const userData = await blogSchema.findOne(data)
                return userData
            }catch(e){
                console.log(e.message)
            }} 


    async getAllUsers(){

        try{
            
            const userData = await userSchema.find({})
            return userData
        }catch(e){
            console.log(e.message)}} 


        async getOneUser(id){
            try{
                return await userSchema.find({email: id })
            }catch(e){console.log(e.message)}} 

    

            async getUserByEmail(email){
                try{
                 return await userSchema.findOne({ email })
                }catch(e){console.log(e.message)}} 
    
                async getUserFromSession(email){
                    try{
                    const userData =  await userSchema.findOne({ email })
                    userData.password = " "
                    return userData;
                    }catch(e){console.log(e.message)}} 

        
                async LogUserIn(data){
                try{

                 const {email, password} = data
                 const user =  await userSchema.findOne({ email })
                 
                if(!user) throw new Error("User not found")
                
                const passwordMatches = require("../utils/utils").comparePassword(password, user.password)
                
                if(passwordMatches)  return user
                
               throw new Error("Password does not match")
                }catch(e){console.log(e.message)}} 



                

       async findBLoggersByCategory(){
        try {
            let readercount = 0,bothCount = 0,writerCount = 0
            const data = await this.getAllUsers();
            data.forEach(user =>{
                if(user.bloggingStyle === "Reader"){
                readercount++
                }
                if(user.bloggingStyle === "writer"){
                    writerCount++
                }
                if(user.bloggingStyle === "Both"){
                    bothCount++
                }})
           
            console.log({consoletype : "SecondCOnsole", bothCount,readercount,writerCount, totalCount :  bothCount+readercount+writerCount})
            console.table({consoletype : "SecondCOnsole", bothCount,readercount,writerCount, totalCount :  bothCount+readercount+writerCount})
        } catch (error) {
            console.log(error)
        }}

        async LogBloggersByCategory(){
            try {
                let readercount = [],bothCount = [],writerCount = []
                const data = await this.getAllUsers();
                data.forEach(user =>{
                    if(user.bloggingStyle === "Reader"){
                    const userObject = {username : user.fullNname,email : user.email, bloggingStyle : user.bloggingStyle, blogs : user.blogs}
                    readercount.push(userObject)
                    }
                    if(user.bloggingStyle === "writer"){
                        const userObject = {username : user.fullNname,email : user.email, bloggingStyle : user.bloggingStyle, blogs : user.blogs}
                        writerCount.push(userObject)
                   }
                    if(user.bloggingStyle === "Both"){
                        const userObject = {username : user.fullNname,email : user.email, bloggingStyle : user.bloggingStyle, blogs : user.blogs}
                        bothCount.push(userObject)
                       }})
               
                console.log({bothCount,readercount,writerCount})
            } catch (error) {
                console.log(error)
            }}



}




module.exports = Read