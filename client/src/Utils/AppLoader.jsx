import { redirect } from "react-router-dom"
import { AuthenticateUser } from "./Api"

export const AppLoader = async ({request}) => {
   
    console.log(request)

    try {
            
    const userAuth =  await AuthenticateUser();
    const userStatus = userAuth.data
    console.log("user status", userStatus)

    if(userStatus.isNew){
        return null
    }

    /* 
    remember when youre done with the message to implement welcaoming an already visited user to join the platforr
    */
   
    if (!userStatus.isNew && userStatus.isAuthenticated) {
        return redirect("/v3/user/dashboard/" + userStatus.userId);
    }

    return null;

} catch (error) {
    console.error("Error in AppLoader:", error);
    throw new Response("Something went wrong", { status: 500 });
}
}