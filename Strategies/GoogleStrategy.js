const passport = require("passport")
const  GoogleStrategy = require("passport-google-oauth20")

require("dotenv").config()

const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const clientID = process.env.GOOGLE_CLIENT_ID



passport.serializeUser((user,done) =>{
    console.log({Msg :"Were in the sterilizing phase"})
    done(null,user.emails[0].value)
})


passport.deserializeUser((email,done) =>{
    console.log({Msg :"The user is desterilized"})
   try {
    console.log(email)
    done(null, email)
   } catch (error) {
    console.log(error)
    done(error,null)
   }
})



passport.use(new GoogleStrategy({
    clientID , clientSecret, callbackURL : "http://localhost:3232/user/auth/signUp/google/success",
}, (accessToken,refreshToken,profile,done) =>{
    try {
        const userData = require("../utils/utils").generateUserData(profile)

        return done(null,profile,userData)
    } catch (error) {
    console.log(error)
    return done(error,null)    
    }
}))