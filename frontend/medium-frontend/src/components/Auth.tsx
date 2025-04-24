import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signupInput } from "@heisenberg_11/medium-common";
import InputLabel from '../components/InputLabel'
import { toast } from 'react-toastify'
import axios from 'axios'

const Auth = () => {
  const [inputData, setInputData] = useState<signupInput>({
    email: "",
    password: "",
    name: "",
  });
   const navigate = useNavigate();

   const onSubmitHandler = async()=>{
    try {
      const res = await axios.post(`https://backend.ankeshkush9651.workers.dev/api/v1/signup`,
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
        <div className="text-5xl font-extrabold ">Create An Account.</div>
        <div className="text-2xl font-semibold text-gray-600">
          Already have an Account? <Link className="text-blue-700 underline" to={"/signin"}>Login</Link>
        </div>
      </div>

      <div className="flex flex-col mt-5 justify-center">
        <InputLabel
          label="Username"
          placeholder="Enter your name..."
          onChange={(e) => {
            setInputData({
              ...inputData,
              name: e.target.value,
            });
          }}
        />

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
          <span>SignUp</span>
        </button>
      </div>
    </div>
  );
};



export default Auth;
