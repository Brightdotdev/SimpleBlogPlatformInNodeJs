import React from 'react'
import { googleSignIn,handleSubmit } from '../../Utils/Utils'
import { useNavigate } from 'react-router-dom'





const SignUp = () => {
  const navigate = useNavigate();
  
  
  const handleUserInput = (e) =>{
    handleSubmit(e, navigate)
  }
  

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
    <h1 className="text-2xl font-bold mb-4">Welcome</h1>
    <form className="space-y-4" onSubmit={handleUserInput}>
      
      
      <div>
        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Enter your full name"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>


      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>     


      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter a strong password"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.
        </p>
      </div>

      
      
      <div>
        <label htmlFor="bloggingStyle" className="block text-sm font-medium text-gray-700">Blogging Style</label>
        <select
          id="bloggingStyle"
          name="bloggingStyle"
          className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select one</option>
          <option value="writer">Writer</option>
          <option value="reader">Reader</option>
          <option value="both">Both</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>      
    </form>
    <div className="flex items-center justify-center">
        <button className='w-full cursor-pointer text-white bg-red-600 hover:bg-red-500 ' onClick={googleSignIn}> Continue with google</button>
    </div>
  </div>
  )
}

export default SignUp