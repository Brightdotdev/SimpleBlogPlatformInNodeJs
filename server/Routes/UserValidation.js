const {Router} = require("express")
const { checkSchema} = require("express-validator")
const { CreateUserValidationSchema, PassportJsValidationSchema, LogInValidationSchema } = require("../utils/validationSchema")
require("../Strategies/GoogleStrategy")
const { LocalSingUp, LocalLogIn, GoogleFinalSetUp,handleUserRedirect,
isNewUser, isUserAuthenticated } = require("../utils/AuthenticationMiddleWares")
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



userValidationRouter.get("/" ,isUserAuthenticated)



userValidationRouter.get("/signUp/auth/failure", (req,res) =>{
   console.log("How did you even get here")
    return  res.redirect(`${process.env.CLIENT_URL}/error?errorMessage=authFailure`)})



module.exports = userValidationRouter