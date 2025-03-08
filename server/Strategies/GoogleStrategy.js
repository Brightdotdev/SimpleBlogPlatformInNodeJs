const passport = require("passport")
const  GoogleStrategy = require("passport-google-oauth20")
const CreateClass = require("../DatabaseControllers/create")
const ReadClass = require("../DatabaseControllers/read")


require("dotenv").config()

passport.serializeUser((user,done) =>{
    console.log({Msg :"Were in the sterilizing phase"})
    return done(null,user.email)})


passport.deserializeUser(async (email,done) =>{

    console.log({Msg :"desterilizing now"})
    const ReadController = new ReadClass()  

    try {
    const foundUser = await ReadController.getUserByEmail(email)
    console.log(email)

    if(!foundUser) throw new Error("User not found or created")
    console.log(foundUser)

    return done(null, foundUser)
    } catch (error) {
    console.log(error)

    return done(error,null)}})


passport.use(new GoogleStrategy({
    clientID :process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET ,
    callbackURL : process.env.SUCCESS_CALLBACK_URL

},async (profile,done) =>{
    const CreateController = new CreateClass()  

    try {
        
        const userData =  require("../utils/utils").generateUserData(profile)
        console.log(userData)

        const userProfile =  await CreateController.createGoogleUser(userData,done)  
        return userProfile

        } catch (error) {
        console.log(error)
        return done(error,null)}}))