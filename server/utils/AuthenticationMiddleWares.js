const { fa } = require('@faker-js/faker')
const CreateClass = require('../DatabaseControllers/create')
const ReadClass = require('../DatabaseControllers/read')
const UpdateClass = require('../DatabaseControllers/update')
const {validationResult,matchedData} = require('express-validator')
const { debounceFunction } = require('./utils')


const saveToSession = (req,data) =>{
        req.session.userId = data.email;

        return new Promise((resolve, reject) =>{
            req.session.save(error => {
                if(error) {
                    console.log(error)
                    const userNotSaved = new Error("User not saved to session")
                    userNotSaved.statusCode = 401
                    return reject(userNotSaved);}
                    return resolve(true)
                })
            })}



const isNewUser = async (req,res,next) =>{
    
    console.log("Yeah were in this function allright")

    try {
        const {user : {email} } = req     
        console.log(user)

         if(!user) { 
        const userNotFound = new Error("No user found")
        userNotFound.statusCode = 404
        throw userNotFound;}

    
        if(!req.isAuthenticated()){
            const notAuthenitcated = new Error("Boy you're not authenticated")
            notAuthenitcated.statusCode = 401
            throw notAuthenitcated;}


        if(user.isNewUser){
        console.log("yeah it's a new user continue")
        return next()}

        await saveToSession(req,user)

        return res.json({
        redirect : `${process.env.CLIENT_URL}/v1/user/dashboard?verified=true&email=${email}`})     
        
    } catch (error) {return next(error);}}


    const handleUserRedirect =  async (req,res) =>{ 
        const {user: {providerId, email }}= req
        return  res.redirect(`${process.env.CLIENT_URL}/googleUser/finalSetUp?userProvider=${providerId}&email=${email}`)}



const LocalSingUp = async (req,res,next) =>{

    const CreateController = new CreateClass();  
    try {
       
        const results = validationResult(req)
        
        if(!results.isEmpty()){
            const dataNotSaved = new Error()
            dataNotSaved.message = results.array();
            dataNotSaved.statusCode = 401
            throw dataNotSaved}


        const data = matchedData(req)
        const newUser = await CreateController.createOneUser(data,next)
        
        await saveToSession(req,newUser)

        return res.status(201).json({message : "User created succesfully", newUser})}
        catch (error) {
            next(error); }}


const LocalLogIn =  async (req,res,next) =>{
            const ReadController = new ReadClass();  
            try {

                const results = validationResult(req)
               
                if(!results.isEmpty()){
                    console.log(results.array())
                    const validationError = new Error("Validation failed");
                    validationError.message = results.array();
                    validationError.statusCode = 401;
                    throw validationError;}
              
                const data = matchedData(req)

                const userExists = await ReadController.LogUserIn(data)

                if(!userExists){
                    const userNotFound = new Error("User not found")
                    userNotFound.message = results.array();
                    userNotFound.statusCode = 404
                    throw userNotFound}

               await saveToSession(req,userExists)
                
               return res.status(200).json({userExists})
            }
            catch (error) {next(error)}}


const GoogleFinalSetUp  =  async (req,res,next) =>{
     const UpdateController = new UpdateClass()
     
     try {
        const results = validationResult(req)

        if(!results.isEmpty()){
            console.log(results.array())
            const validationError = new Error("Data Validation failed");
            validationError.statusCode = 401;
            throw validationError;}
            
        const data = matchedData(req)

        console.log("data from  the body " ,  data)

        if(!data){
            const nodDataFound = new Error("No data provided")
            nodDataFound.statusCode = 401
            throw nodDataFound}

            await saveToSession(req,data)

            await UpdateController.updateUserDataFromPassport(data,next)
            return res.json({
               redirect: `${process.env.CLIENT_URL}/v3/user/dashboard`,
               verified: true,
               email: data.email});

       } catch (error) {next(error)}}


const isUserAuthenticated =  (req,res) => {
       

    console.log( "from is authenticated", req.isAuthenticated())

      if (!req.session.visited) {
        req.session.visited = true;
        return res.json({isNew : true,
        isAuthenticated : false,
        userId : null})
      }


    if(req.session.userId){
        console.log( "the session id" , req.session.userId)
        console.log(req.isAuthenticated(), "from is authenticated")
        console.log( req.user.email)

        return res.json({
        isNew : false,
        isAuthenticated : true,
        userId : req.session.userId || req.user.email})}
        
        return res.json({
        isNew : false,
        isAuthenticated : false,
        userId : null
        })}



module.exports = {isNewUser,handleUserRedirect, 
    LocalSingUp,LocalLogIn,GoogleFinalSetUp, saveToSession, isUserAuthenticated}