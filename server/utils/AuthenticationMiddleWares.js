const CreateClass = require('../DatabaseControllers/create')
const ReadClass = require('../DatabaseControllers/read')
const UpdateClass = require('../DatabaseControllers/update')
const {validationResult,matchedData} = require('express-validator')


const saveToSession = (req,data) =>{
        req.session.userId = data.email;
        return new Promise((resolve, reject) =>{
            req.session.save(error => {
                if(error) reject(error)
                resolve()
            })
        })
}

const isNewUser = async (req,res,next) =>{

    console.log("Yeah were in this function allright")
    const {user} = req 

    console.log(user)

    if(!user) return res.status(400).json({ error: "No user found" });
   
    console.log(req.isAuthenticated())

    
    if(!user.isNewUser && req.isAuthenticated()){
    
    console.log(true , "theyre not new")
    await saveToSession(req,user)

    
    return res.json({
        redirect : `${process.env.CLIENT_URL}/o/user/dashboard?verified=true&email=${data.email}`
    })
}


    return next()}


    const handleUserRedirect =  async (req,res) =>{ 
        const {user: {providerId, email }}= req
        
        return  res.redirect(`${process.env.CLIENT_URL}/googleUser/finalSetUp?userProvider=${providerId}&email=${email}`)
      }

const LocalSingUp = async (req,res) =>{
    const CreateController = new CreateClass();  
    try {
        const results = validationResult(req)
        
        if(!results.isEmpty())
        return res.send({message : results.array()}) 

        const data = matchedData(req)
        const newuser = await CreateController.createOneUser(data)
       
   
        await saveToSession(req, newuser)

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
           
                await saveToSession(req,userExists)
                
                return res.status(200).send({userExists})
            }
            catch (error) {res.status(500).send(error)}}


const GoogleFinalSetUp  =  async (req,res) =>{
  
    try {

        const results = validationResult(req)
        if(!results.isEmpty()) return res.status(400).send({message : results.array()}) 
      

        const UpdateController = new UpdateClass()
        const data = matchedData(req)

        console.log("data from  the body " ,  data)
        if(!data) return res.status(400).send({message : "No data provided"})
       
            
        
            await saveToSession(req,data)

            await UpdateController.updateUserDataFromPassport(data)
            return res.json({
               redirect: `${process.env.CLIENT_URL}/o/user/dashboard`,
               verified: true,
               email: data.email
             });
       } catch (error) {res.status(500).send(error)}}


const isUserAuthenticated =  (req,res,next) => {
       
    if(req.session.userId) {
        console.log(req.session.userId)
        return next()
    }
        
        return res.json( {message : "Youre not authorized to view this page boss",
         reditect : `${process.env.CLIENT_URL}/Login`
        } )}



module.exports = {isNewUser,handleUserRedirect, 
    LocalSingUp,LocalLogIn,GoogleFinalSetUp, saveToSession,
    isUserAuthenticated}