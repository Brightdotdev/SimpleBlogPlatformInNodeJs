

const ReadClass = require("../DatabaseControllers/read")

const handleDashBoard = async (req,res) =>{
    console.log("yah youre here alright dashboard yayy")
    const {session : { userId} } = req
    if(!userId) throw new Error("User id is not in the session")
    
    const ReadController = new ReadClass()
    
    const user = await  ReadController.getUserFromSession(userId)
    
    console.log(user)
    if(!user) {
        return res.status(404).send("User not found")}

    return res.status(200).send({message : "Welcome to the dashboard", user})
}


module.exports = {handleDashBoard}