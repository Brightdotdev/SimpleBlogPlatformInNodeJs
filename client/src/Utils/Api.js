import axios from "axios";


const Api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials : true,    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
})


export const AuthenticateUser =  async () => {
    try {
      console.log("we are her ooooo")
      const response = await Api.get("/v3/user/auth/authenticator");
      return response
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };


export const SingUserUp = (data) => Api.post("/v3/user/auth/signup/new", data);

export const GetUserDashBoard = () => Api.get("/v3/api/user/dashboard");

export  const LoginUserIn = (data) => Api.post("/login/user", data);

export  const GoogleFinalSetUpApi = (data) => Api.post("/v3/user/auth/googleUser/finalSetUp", data);

