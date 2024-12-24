const userSchema = require("./UserSchema")
const blogSchema = require("./BlogSchema")
const {connectToDatabase} = require("./utils")

class Read{

    constructor(){
        this.initializeDatabaseConnection()
    }


    async initializeDatabaseConnection() {
        try{
            await connectToDatabase();
            console.log("Connected from the read class")
        }catch(err){
            console.log("Error connceting to database")
            console.log(err.message)}}

    async getAllBlogs(){
        try{
            await this.initializeDatabaseConnection()
            const userData = await blogSchema.find({})
         return userData
        }catch(e){
            console.log(e.message)
        }} 

        async getOneBlog(data){
            try{
                await this.initializeDatabaseConnection()
                const userData = await blogSchema.findOne(data)
                return userData
            }catch(e){
                console.log(e.message)
            }} 


    async getAllUsers(){

        try{
            await this.initializeDatabaseConnection()
            const userData = await userSchema.find({})
            return userData
        }catch(e){
            console.log(e.message)}} 


        async getOneUser(id){
            try{
                await this.initializeDatabaseConnection()
                const userData = await userSchema.find({ _id : id })
                return userData
            }catch(e){
                console.log(e.message)}} 


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