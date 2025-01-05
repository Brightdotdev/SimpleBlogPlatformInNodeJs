const express = require("express")
const { faker, el } = require("@faker-js/faker")
const {getUserInput,generateComments,generateRandomUsers,generateUsername, connectToDatabase} = require("./utils/utils")
const CreateClass = require("./DatabaseControllers/create")
const ReadClass = require("./DatabaseControllers/read")
const UpdateClass = require("./DatabaseControllers/update")
const userValidationRouter = require("./Routes/UserValidation")
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")

require("dotenv").config()


const app = express()
connectToDatabase()

app.use(cookieParser("bomboclattttttt"))
app.use(express.json())
app.use(session({
    secret : "bomboclatttttt",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 5 * 60 * 1000,

    }}))


app.use(passport.initialize())
app.use(passport.session())


app.use("/user/auth", userValidationRouter)



const PORT = process.env.PORT

async function insertUsers(){
    try{
        const userController = new CreateClass();
        for (let index = 0; index < 20; index++) {
            const fullName = faker.person.fullName()
            const userMail = fullName.split(" ")[1] + "@gmail.com"
            const userName = generateUsername(fullName)
            const getUser = {
                fullNname : fullName,
                email : userMail,
                userName : userName,
                password : faker.internet.password(12, true, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/),
                bloggingStyle : ["writer", "Reader", "Both"][Math.floor(Math.random()* 3)],
                socialLinks : {
                    linkedIn :  `https://www.linkedin.com/${userName.toLowerCase()}`,
                    instagram : `https://www.instagram.com/${userName.toLowerCase()}`,
                    facebook :  `https://www.facebook.com/${userName.toLowerCase()}`
                },
            }
            await userController.createOneUser(getUser)
        }
    }catch(e){
        console.log(e.message)
    } 
}






  


app.get("/" ,(req,res) =>{
    res.send({Msg: "Welcome motherfucker"})
})



const generateBlogAndLinkWithUsers  = async (userData) =>{
try{
    const CreateController = new CreateClass();
    const UpdateController = new UpdateClass();


    for (const user of userData) {

        if(user.bloggingStyle === 'Reader'){
            console.log({ uerName : user.fullNname, message:  "You're just a reader"})
            continue
        }else{

            const blogTitle =  faker.lorem.words({min: 2, max: 5})
            const blogTags = faker.helpers.slugify(blogTitle).split("-")

        const blog =  {
            blogTitle , 
            blogBody: faker.lorem.paragraphs(2),
            status : ["pending","published"][Math.floor(Math.random() * 2)],
            comments :generateComments(userData),
            likes : generateRandomUsers(userData) ,
            author: user._id, 
            blogTags
        };
    
        await CreateController.createBlog(blog)
        
        console.log("Blog created")
        await UpdateController.linkBlogToUser(blog,user._id)
   
       }}}catch(e){console.log(e)}}



async function generateBlogs() {
    try {
        const ReadBlogs =  new ReadClass()

        const data = await ReadBlogs.getAllUsers();
          await generateBlogAndLinkWithUsers(data)     
    
    } catch (error) {
        console.log(error)
    }}


    
    async function main() {
        const choice = await getUserInput("Enter '1' to insert users, '2' to insert blogs, or '3' to exit: ");
        if (choice === '1') {
            await insertUsers();
            await main();
        } else if (choice === '2') {
            await generateBlogs();
            await main();
        } else if (choice === '3') {
            console.log("Exiting...");
            process.exit(0);
        } else {
            console.log("Invalid choice");
            await main()
        }
    }




    app.listen(PORT, () =>{
        console.log(`We listen on port localhost:${PORT} not Davido`)
    })