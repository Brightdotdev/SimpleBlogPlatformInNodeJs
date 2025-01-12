const passport = require("passport")
const  GoogleStrategy = require("passport-google-oauth20")
const CreateClass = require("../DatabaseControllers/create")
const ReadClass = require("../DatabaseControllers/read")


require("dotenv").config()

const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const clientID = process.env.GOOGLE_CLIENT_ID


passport.serializeUser((user,done) =>{
    console.log({Msg :"Were in the sterilizing phase"})
    return done(null,user.id)})


passport.deserializeUser(async (id,done) =>{
    console.log({Msg :"desterilizing now"})

    const ReadController = new ReadClass()  

    try {
    const foundUser = await ReadController.getOneUser(id)
    if(!foundUser) throw new Error("User not found or created")
    return done(null, foundUser)
    } catch (error) {
    console.log(error)
    return done(error,null)}})


passport.use(new GoogleStrategy({
    clientID , clientSecret, callbackURL : "http://localhost:3232/user/auth/signUp/google/success"
},async (accessToken,refreshToken,profile,done) =>{
    
    const CreateController = new CreateClass()  
    const ReadController = new ReadClass()  
    
    try {
        const userData =  require("../utils/utils").generateUserData(profile)

        const existingUser = await ReadController.getUserByEmail(userData.email)
        if(existingUser) return done(null,existingUser)
        
        const userProfile =  await CreateController.createOneUser(userData)
        return done(null,userProfile)
    } catch (error) {
    console.log(error)
    return done(error,null)}}))