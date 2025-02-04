
import { SingUserUp,GoogleFinalSetUpApi } from "./Api";

 export const handleSubmit = async (e, navigate) => {
    e.preventDefault()
    try{
    
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries());
    const response = await SingUserUp(data)
    
    if(response.status === 201){
      navigate("/Login")
    
    }}catch(error){ console.error(error)}}



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
    
 
    window.location.href = `${response.data.redirect}?verified=${response.data.verified}&email=${response.data.email}`

    if(response.status === 500){ return navigate("/Login") }}

    catch(error){console.log(error.response.data)}}
    
  export const googleSignIn = async (e) => window.location.href = import.meta.env.VITE_REDIRECT_URL

    