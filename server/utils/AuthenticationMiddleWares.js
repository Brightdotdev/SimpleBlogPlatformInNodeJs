const CreateClass = require('../DatabaseControllers/create')
const ReadClass = require('../DatabaseControllers/read')
const UpdateClass = require('../DatabaseControllers/update')
const {validationResult,matchedData} = require('express-validator')


const isNewUser = async (req,res,next) =>{

    console.log("Yeah were in this function allright")
    const {user} = req 
    console.log(user)
    console.log(req.isAuthenticated())
    console.log(`${process.env.CLIENT_URL}/user/dashboard`)
    
    if(!user[0].isNewUser && req.isAuthenticated()){
        console.log(true , "theyre not new")
        req.session.userId = user[0].email;
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`)
}

    return next()}


    const handleUserRedirect =  async (req,res) =>{ 
        const userId = req.user[0].providerId;
        console.log(userId)
        return  res.redirect(`${process.env.CLIENT_URL}/googleUser/finalSetUp?userProvider=${userId}&email=${req.user[0].email}`)
      }

const LocalSingUp = async (req,res) =>{
    const CreateController = new CreateClass();  
    try {
        const results = validationResult(req)
        
        if(!results.isEmpty())
        return res.send({message : results.array()}) 

        const data = matchedData(req)
        const newuser = await CreateController.createOneUser(data)
        req.session.userId = newuser.email;
        return res.status(201).send({message : "User created succesfully", newuser})}
        catch (error) {res.status(500).send(error)}}


const LocalLogIn =  async (req,res) =>{
            const ReadController = new ReadClass();  
            try {
                const results = validationResult(req)
                if(!results.isEmpty())
                return res.send({message : results.array()}) 
              
                const data = matchedData(req)
                const userExists = await ReadController.LogUserIn(data)
                if(!userExists) return res.status(404).send({message : "User not found"})
                return res.status(200).send({userExists})
            }
            catch (error) {res.status(500).send(error)}}


const GoogleFinalSetUp  =  async (req,res) =>{
    try {

        const results = validationResult(req)
        if(!results.isEmpty()) return res.status(400).send({message : results.array()}) 
      
        const UpdateController = new UpdateClass()
        const data = matchedData(req)

        if(!data) return res.status(400).send({message : "No data provided"})
       
        req.session.userId = data.email;
        await UpdateController.updateUserDataFromPassport(data)
        return res.redirect(`${process.env.CLIENT_URL}/user/dashboard`)
       } catch (error) {res.status(500).send(error)}}


const isUserAuthenticated =  (req,res,next) => {
  
        if(req.isAuthenticated()) return next()
            
        return res.redirect(`${process.env.CLIENT_URL}/Login`)}



module.exports = {isNewUser,handleUserRedirect, 
    LocalSingUp,LocalLogIn,GoogleFinalSetUp,
    isUserAuthenticated}