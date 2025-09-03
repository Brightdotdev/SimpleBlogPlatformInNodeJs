// Desc: Utils functions for the app
import { SingUserUp,GoogleFinalSetUpApi } from "./Api";

 export const handleSubmit = async (e, navigate) => {
    e.preventDefault()
    try{
    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries());
    const response = await SingUserUp(data)
    
    console.log({ data,response})
    
    if(response.status === 201){
      console.log(response.data)
      console.log(response)
     return navigate("/Login")}
  

    if(response.status > 300){
      console.log(response)
      console.log(response.data)
      console.log(response)
      return navigate(`/error?errorMessage=${response.data}&status=${response.status}`)}


  }
    catch(error){ 
      console.error(error)
      navigate(`/error?errorMessage=${error}`)
    
    }}

    


export const finalGoogleSetUp = async (e, userData,navigate)  => {

    e.preventDefault();
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries());
    console.log("formData ", data )
    data.id = userData.userProvider;
    data.email = userData.email
    console.log("formData ", data )
   
    try{
     const response = await GoogleFinalSetUpApi(data)
    console.log(response)

    if(response.status === 201)
    return navigate(`${response.data.redirect}?verified=${response.data.verified}&email=${response.data.email}`
    ,{replace : true})
    

    if(response.status === 500){
      console.log(response.data)
      return navigate(`/error?errorMessage=${response.data}&status=${response.status}`)
     }}

    catch(error){
      console.log(error.response.data)
      return navigate(`/error?errorMessage=${error.response.data}&status=${error.response.status}`)}
    }


    
    export const googleSignIn = async (e) => {
      try {
        const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
        if (!redirectUrl) {
          throw new Error("Google Sign in is currently not available. Please try other sign-in methods.");
        }
        window.location.href = redirectUrl;
      } catch (error) {
        console.error(error);
        throw new Error("Google Sign in is currently not available. Please try other sign-in methods.");
      }
    }
    