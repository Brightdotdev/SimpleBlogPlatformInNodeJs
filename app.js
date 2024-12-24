
const { faker, el } = require("@faker-js/faker")
require("dotenv").config()
const {connectToDatabase} = require("./utils")
const CreateClass = require("./create")
const ReadClass = require("./read")
const UpdateClass = require("./update")




const generateUsername = (fullName) => {
    const nameSplits = fullName.split(" ")
    return nameSplits[1] + "_" + Math.floor(Math.random() * 2001)
} 



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





  



const generateRandomUsers = (userData) =>  {
    const randomNumber = Math.floor(Math.random() * 5)
    const usersArray = []
    for (let index = 0; index < randomNumber; index++) {
        const userIndex = Math.floor(Math.random() * userData.length)
        const user = userData[userIndex]._id
        usersArray.push(user)
    }
    return usersArray
}

const generateComments = (userData) =>  {
    const randomNumber = Math.floor(Math.random() * 5)
    const usersArray = []
    for (let index = 0; index < randomNumber; index++) {
        const userIndex = Math.floor(Math.random() * userData.length)
        const user = userData[userIndex]._id
        const comment = faker.lorem.lines(1)
        usersArray.push({commenter : user , comment})
    }
    return usersArray
}


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


    
    generateBlogs()