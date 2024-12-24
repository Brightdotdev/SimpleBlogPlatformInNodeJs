const readline = require("readline");
const mongoose = require("mongoose");


const getUserIinput =(question) =>{

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



const  connectToDatabase = async () => {
    try{
     const uri = process.env.MONGODB_URI
    await mongoose.connect(uri)
    console.log("connected")
    }catch(e){
        console.log(e.message)
    }
}


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

const connect = async (client) =>{
    try{
    await client.connect();
    console.log("Connected Succesfully");
    }
    catch(error){
        console.log(`${error} caused it not to connect`);
    }
} 


  module.exports = {connect,getUserIinput,validAge,validBlog,validEmail,validName,connectToDatabase}