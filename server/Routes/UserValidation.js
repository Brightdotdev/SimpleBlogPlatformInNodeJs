const {Router} = require("express")
const { checkSchema, validationResult, matchedData } = require("express-validator")
const { CreateUserValidationSchema, PassportJsValidationSchema, LogInValidationSchema } = require("../utils/validationSchema")
require("../Strategies/GoogleStrategy")
const { LocalSingUp, LocalLogIn, GoogleFinalSetUp,handleUserRedirect,isNewUser } = require("../utils/AuthenticationMiddleWares")
const passport = require("passport")


const userValidationRouter = Router()

//local strategy
userValidationRouter.post("/signUp/new", checkSchema(CreateUserValidationSchema), LocalSingUp)

userValidationRouter.post("/login/user", checkSchema(LogInValidationSchema) ,LocalLogIn)

//google strategy
  userValidationRouter.get("/google/user" , passport.authenticate("google", {scope : ["profile", "email"]}))

//google's callback
   userValidationRouter.get("/signUp/google/success" ,passport.authenticate("google", {failureRedirect : "/user/auth/signUp/auth/failure", successRedirect : "/user/auth/googleUser/finalSetUp"}))

    
userValidationRouter.get("/googleUser/finalSetUp" , isNewUser , handleUserRedirect)


userValidationRouter.post("/googleUser/finalSetUp" ,checkSchema(PassportJsValidationSchema) , GoogleFinalSetUp)



userValidationRouter.get("/authenticator" , (req,res) =>{

   const userExists = req.session.userId 
   console.log("this function is functioning yes")
   if(!userExists){ 
      return res.status(401).send(false)
   }
   return res.status(200).send(true)
})



userValidationRouter.get("/signUp/auth/failure", (req,res) =>{
   console.log("How did you even get here")
    return  res.redirect(`${process.env.CLIENT_URL}/auth/fail`)})



module.exports = userValidationRouter