const { session } = require("passport")
const ReadClass = require("../DatabaseControllers/read")

const handleDashBoard = async (req,res) =>{
    console.log("yah youre here alright")
    const {session : { userId} } = req
    if(!userId) throw new Error("User id is not in the session not found")
    
    const ReadController = new ReadClass()
    
    const user = await  ReadController.getOneUser(userId)
    if(!user) throw new Error("User not found")

        console.log(user)
    return res.status(200).send({message : "Welcome to the dashboard", user})
}


module.exports = {handleDashBoard}