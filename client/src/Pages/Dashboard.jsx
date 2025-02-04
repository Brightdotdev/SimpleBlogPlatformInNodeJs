import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { GetUserDashBoard } from "../Utils/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData ]= useState({})
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
  
  const verifyUser = async () => { 
   
    try {
      const response = await GetUserDashBoard()
      console.log(response)
      
    } catch (error) {
      console.error(error)    
     console.log("from the dashboard");
   
    }finally{  setLoading(false);}}


verifyUser();

}, [navigate])

  if (!userData) { 
   console.log("from the dashboard");
  }


if (!userData) { 
      <div>
        loadinggg...
      </div>
    }


return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
 bomboclattt
</div>
);
};

export default Dashboard;
