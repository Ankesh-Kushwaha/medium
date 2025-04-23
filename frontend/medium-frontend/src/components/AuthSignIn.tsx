import React,{useState} from 'react'
import { signinInput } from '@heisenberg_11/medium-common'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import InputLabel from '../components/InputLabel'
import axios from 'axios'
import {toast} from 'react-toastify'

const AuthSignIn = () => {
  const navigate = useNavigate();
    const [inputData, setInputData] = useState<signinInput>({
    email: "",
    password: "",
  });

  const onSubmitHandler = async()=>{
    try {
      const res = await axios.post(`https://backend.ankeshkush9651.workers.dev/api/v1/signin`,
        inputData);
      const jwt = res.data.jwt;
      localStorage.setItem("token", jwt);
      toast.success(res.data.message);
      navigate('/blogs');
    }
    catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  }



  return (
    <div className="h-screen flex justify-center flex-col ml-30">
      <div className="flex flex-col justify-center">
        <div className="text-5xl font-extrabold ">Welcome Back !</div>
        <div className="text-2xl font-semibold text-gray-600">
          New to Blog? <Link className="text-blue-700 underline" to={"/signup"}>Sign Up</Link>
        </div>
      </div>

      <div className="flex flex-col mt-5 justify-center">
        <InputLabel
          label="Email"
          placeholder="Enter your email..."
          onChange={(e) => {
            setInputData({
              ...inputData,
              email: e.target.value,
            });
          }}
        />

        <InputLabel
          label="Password"
          type={"Password"}
          placeholder="Enter your password..."
          onChange={(e) => {
            setInputData({
              ...inputData,
              password: e.target.value,
            });
          }}
        />
      </div>

      <div>
        <button onClick={onSubmitHandler} className="bg-gray-500 text-center text-white w-3xs hover:bg-gray-700 font-bold py-2 px-4 rounded-full flex justify-center">
          <span>Sign In</span>
        </button>
      </div>
    </div>
  )
}

export default AuthSignIn