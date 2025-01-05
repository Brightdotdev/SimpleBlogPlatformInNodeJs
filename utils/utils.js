const readline = require("readline");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const { profile } = require("console");



//initial codes fore error handling and error checking

const validName =(name)=>
  {
      return name.trim().length > 2;
  }
const validAge = (age) => 
{
  const num = parseInt(age, 10);
  return !isNaN(num) && num > 0;
}

const validEmail = (email) =>
  {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email)
  }
const validBlog =(blogging) =>
  {
    if(blogging === 'both' || blogging === 'writer' || blogging === 'reader' ) 
      {
        return blogging
      }
  }




const getUserInput =(question) =>{

    const input = readline.createInterface({
        input : process.stdin,
        output : process.stdout,
        prompt : "mongodb> "
    })
    return new Promise((resolve,reject) =>{
        input.question(question,(answer) =>{
            input.close();
            resolve(answer)
            console.log(answer)
        })
    })
}

//new helper functions




const generateUsername = (fullName) => {
  const nameSplits = fullName.split(" ")
  return nameSplits[1] + "_" + Math.floor(Math.random() * 2001)
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




const urlValidator = (platform) => ({
    type: String,
    match : [ new RegExp(`^(https?:\/\/)?(www\.)?${platform}\.com\/[A-Za-z0-9-._~%&?=+#]*$`) , `That's not a valid ${platform} url` ]
})



const  connectToDatabase = async () => {
    try{
     const uri = process.env.MONGODB_URI
    await mongoose.connect(uri)
    console.log("connected")
    }catch(e){
        console.log(e.message)
    }
}

const generateUserData = (profile) =>{
  return{
    username : profile.displayName,
    fullname : profile.familyName + " " + profile.givenName,
    providerId : profile.id,
    provider : profile.provider,
    isFromExternalAuthentication : true,
    userImage : profile.photos[0].value,
    email : profile.emails[0].value}}



    
  module.exports = {
  getUserInput,generateUserData,
    validAge,validBlog,validEmail,validName,
    connectToDatabase,urlValidator,
    generateUsername,generateComments,
    generateRandomUsers
  }