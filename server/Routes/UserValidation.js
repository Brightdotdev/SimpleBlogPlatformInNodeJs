const {Router} = require("express")
const { checkSchema, validationResult, matchedData } = require("express-validator")
const { CreateUserValidationSchema, PassportJsValidationSchema,isNewUser } = require("../utils/validationSchema")
const CreateClass = require("../DatabaseControllers/create")
const UpdateClass = require("../DatabaseControllers/update")
const ReadClass = require("../DatabaseControllers/read")

const passport = require("passport")
const userValidationRouter = Router()
require("../Strategies/GoogleStrategy")



//local strategy
userValidationRouter.get("/signUp/new", async (req,res) =>{
  try {
      console.log("Yeah youre here")
    return res.status(200).send("Yeah youre here")
    }
     catch (error) {console.log(error)}})



userValidationRouter.post("/signUp/new", checkSchema(CreateUserValidationSchema) , async (req,res) =>{
    const CreateController = new CreateClass();  
    try {
        const results = validationResult(req)
        if(!results.isEmpty())
        return res.status(401).send({message : results.array()}) 
        const data = matchedData(req)
        const newuser = await CreateController.createOneUser(data)
        return res.status(201).send({message : "User created succesfully", newuser})}
        catch (error) {console.log(error)}})



     
        
//google strategy
  userValidationRouter.get("/google/user" , passport.authenticate("google", {scope : ["profile", "email"]}))


//google's callback
   userValidationRouter.get("/signUp/google/success" ,passport.authenticate("google", {failureRedirect : "/user/auth/signUp/google/failure", successRedirect : "/user/auth/googleUser/finalSetUp"}))

    
userValidationRouter.get("/googleUser/finalSetUp",isNewUser, async (req,res) =>{ 
   
    
    
    return res.send({msg :"It worked?",user : req.user})})


 
userValidationRouter.get("/googleUser/finalSetUpp", async (req,res) =>{ 
   
    console.log(req.user)
    
    return res.send({msg :"It worked?",user : req.user})})   



   userValidationRouter.put("/googleUser/finalSetUp",checkSchema(PassportJsValidationSchema) , async (req,res) =>{

    try {
        const {user, userName} = req
        const results = validationResult(req)
        if(!results.isEmpty()) return res.status(400).send({message : results.array()}) 
        
        console.log(req.user)
        console.log(userName)
        console.log("Data?...", req.userDataFrmMiddleWare)
        console.log("Is authenticated?",req.isAuthenticated())

        const UpdateController = new UpdateClass()
        const ReadController = new ReadClass()

        console.log(user)
        if(!user) return res.status(404).send("User not found")
        
        const data = matchedData(req)
        await UpdateController.updateUserDataFromPassport(data,user)
        const proof = ReadController.getOneUser(user)
        res.status(201).send({msg : "user Updated ig?", proof})
   
    } catch (error) {console.log(error)}})

userValidationRouter.get("/signUp/google/failure", (req,res) =>{
   console.log("How did you even get here")
    return res.send("Yeah yk you failed")
})



module.exports = userValidationRouter