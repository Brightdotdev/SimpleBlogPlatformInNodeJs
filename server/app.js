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


const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 5000

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
    req.session.visited = true;

    

    console.log("Current session:", req.session);
  
    
    if (req.session.visited) {
      console.log("You have visited this page");
    }
    if (req.session.id) {
      console.log("You have a session id");
    }
    if (req.session.userId) {
      console.log("Session userId:", req.session.userId);
    }
  
    
    res.send(`
      <div>
        <p>Check your console for session details.</p>
      </div>
    `);
})


app.listen(PORT, () =>{
    console.log(`We listen on port localhost:${PORT} not Davido`)
})