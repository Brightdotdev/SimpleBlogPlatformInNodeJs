const {Router} = require("express")
const { checkSchema, validationResult, matchedData } = require("express-validator")
const { CreateUserValidationSchema } = require("../utils/validationSchema")
const CreateClass = require("../DatabaseControllers/create")
const passport = require("passport")
const userValidationRouter = Router()
require("../Strategies/GoogleStrategy")


userValidationRouter.get("/signUp/new", async (req,res) =>{
  try {
      res.status(200).send("Yeah youre here")
      console.log("Yeah youre here")}
    
     catch (error) {console.log(error)}})



userValidationRouter.post("/signUp/new", checkSchema(CreateUserValidationSchema) , async (req,res) =>{
    const CreateController = new CreateClass();  
    try {
        console.log(req.body)
        const results = validationResult(req)
        if(!results.isEmpty())
        return res.status(401).send({message : results.array()}) 
        const data = matchedData(req)
        const newUser = await CreateController.createOneUser(data)
        return res.status(201).send({message : "User created succesfully", newUser})}
        catch (error) {console.log(error)}})

        
userValidationRouter.get("/google/user" ,
    passport.authenticate("google", {scope : ["profile", "email"]})
    ,  (req,res) =>{
     
        if (!req.user) return res.status(400).send("At least you made it this far")
        console.log("howwwww")
        return  res.send(user)
    
})


userValidationRouter.get("/signUp/google/success" ,
    passport.authenticate("google", {failureRedirect : "/signUp/google/failure"})
    ,(req,res) =>{  
        if (!req.user) return res.status(400).send("At least you made it this far")
            const  {authInfo} = req 
            console.log({authInfo : {msg : "Auth info", authInfo}, authInfo : {msg : "user", user : req.user}})
          
            res.cookie("userDataChunk", JSON.stringify(authInfo),{ signed : true , secure : false, path : "/user/auth"})
            console.log(req.signedCookies.userDataChunk)
            console.log("howwwww")
          

            return res.status(201)})


/* userValidationRouter.get("/signUp/google/success", async (req,res) =>{
        console.log("Thank God next levell boyyy")
        return res.send("Yeah it worked").status(201)})*/

    
userValidationRouter.post("/signUp/google/success", async (req,res) =>{
     
    
    console.log("FInally sent the form huh")
    const Create = require("../DatabaseControllers/create")
    
    try {
        const {body,signedCookies : {userDataChunk}} = req
        const userData = userDataChunk ? JSON.parse(userDataChunk) : null
        console.log({msg :"User data", userData})
        console.log(req.signedCookies)
        console.log(req.cookies)

        console.log({msg :"Body", body})

        if (!userData) return res.status(400).send("At least you made it this farrrrr")
        const completeUserInfo = {...userData,...body}
        console.log({msg: "Complete user info", completeUserInfo})
          
            const CreateController = new Create()  
            const newUser = await CreateController.createOneUser(completeUserInfo)
            return res.status(201).send("Yeah the user is in the database now")}
    catch (error) {
        console.log(error)
        return res.send("omo at the end of everything?????").status(500)}})




userValidationRouter.get("/signUp/google/failure", (req,res) =>{
   console.log("How did you even get here")
    return res.send("Yeah yk you failed")
})
module.exports = userValidationRouter