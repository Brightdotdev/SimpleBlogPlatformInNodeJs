import axios from "axios";


// axios.defaults.baseURL = import.meta.env.VITE_API_URL;   


const Api = axios.create({
    withCredentials : true,
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials : true,    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'}
})

export  const SingUserUp = (data) => Api.post("/user/auth/signup/new", data);
export const GetUserDashBoard = () => Api.get("/user/dashboard");

export  const LoginUserIn = (data) => Api.post("/login/user", data);

export  const GoogleFinalSetUpApi = (data) => Api.post("/user/auth/googleUser/finalSetUp", data);

