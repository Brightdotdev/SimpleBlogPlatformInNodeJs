const express = require("express")
const { faker, el } = require("@faker-js/faker")
const {connectToDatabase} = require("./utils/utils")
const {errorMiddleware} = require("./utils/ErrorMiddleware")
const MongoStore = require("connect-mongo")
const userValidationRouter = require("./Routes/UserValidation")
const userPages = require("./Routes/userPages")
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { default: rateLimit } = require("express-rate-limit")


const customRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  keyGenerator: (req) =>{
    
       if (req.session && req.session.userId) {
        return req.session.userId; 
    }
    return req.ip;
  },
  handler: (req, res, next) => {
      const error = new Error("You're sending too many requests! 🚨 aahhhh oga it's okay");
      error.details = {
        limitedBy: req.session?.userId ? "UserID" : "IP",
        identifier: req.session?.userId || req.ip, 
    };
      error.status = 429;
      next(error);
  }
});


const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 5000
app.use(customRateLimiter)
connectToDatabase();

app.use(cors({credentials : true,  origin: process.env.CLIENT_URL}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET))    

app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : false,
    resave : false,
    cookie : {
        secure : false,
      maxAge: 30 * 24 * 60 * 60 * 1000 
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl : 30 * 24 * 60 * 60 * 1000 
    })
}))


app.use(passport.initialize())
app.use(passport.session())



app.use("/v3/user/auth", userValidationRouter)

app.use("/v3/api/user", userPages)


app.use(errorMiddleware)

 app.get("/" ,(req,res) =>{

  if (req.session.id) {
    console.log(req.session.id);
    console.log("You have a session id");}

    console.log("Session userId:", req.session.userId);
    console.log("Session cookie:", req.session.cookie);
  if (!req.session.visited) {
  req.session.visited = true;
  return res.send({isNew : true})
  }
  
   return res.send({isNew : false})
    
})


app.listen(PORT, () =>{
    console.log(`We listen on port localhost:${PORT} not Davido`)
})