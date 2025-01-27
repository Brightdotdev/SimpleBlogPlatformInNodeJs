import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { GetUserDashBoard } from "../Utils/Api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData ]= useState({})
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
  
  const verifyUser = async () => { 
   
    try {
      const response = await GetUserDashBoard();

      if(response.status === 200){
        console.log(response)
        setUserData(response.data.user[0])
        setUser(response.data.user[0])
        console.log(response.data.user[0])
  
        console.log(userData)
      }else{
        alert("You need to be logged in to view this page");
        navigate("/Login")
        ;}
    } catch (error) {
      console.error(error)      
      
    }


    }


verifyUser();
}, [])

if (!user) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-lg text-gray-700">No user data found.</p>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
      {/* Profile Header */}
      <div className={`flex flex-col items-center space-y-4 ${loading ? "animate-pulse" : ""}`}>
        <img
          src={user.userImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
        />
        <h1 className="text-3xl font-bold text-gray-800">{user.fullname}</h1>
        <p className="text-lg text-gray-600">@{user.username}</p>
      </div>

      {/* Profile Details */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">Provider:</span>
          <span className="text-gray-800 capitalize">{user.provider}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">Joined:</span>
          <span className="text-gray-800">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">Blogging Style:</span>
          <span className="text-gray-800 capitalize">{user.bloggingStyle}</span>
        </div>
      </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">No blogs published.</p>
        </div>
     
    </div>
  </div>
);
};

export default Dashboard;
