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

},async (accessToken, refreshToken, profile, done) =>{
    const CreateController = new CreateClass()  

    try {
        

          if (!profile.emails || !profile.emails.length) {
            throw new Error("No email found in Google profile!");
        }

        const userData = require("../utils/utils").generateUserData(profile);
        const userProfile = await CreateController.createGoogleUser(userData);
        console.log(userProfile)
        return done(null, userProfile);
        } catch (error) {
        console.log(error)
        return done(error,null)}}))