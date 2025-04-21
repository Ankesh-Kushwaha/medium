import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupInput } from "@heisenberg_11/medium-common";

const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const [inputData, setInputData] = useState<signupInput>({
    email: "",
    password: "",
    name: "",
  });

  const onSubmitHandler = (e)=>{
    e.preventDefault();
  }

  return (
    <div className="h-screen flex justify-center flex-col ml-30">
      <div className="flex flex-col justify-center">
        <div className="text-5xl font-extrabold ">Create An Account.</div>
        <div className="text-2xl font-semibold text-gray-600">
          Already have an Account? <Link to={"/signin"}>Login</Link>
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
        <button type="submit" onSubmit={onSubmitHandler} className="bg-gray-500 text-center text-white w-3xs hover:bg-gray-700 font-bold py-2 px-4 rounded-full flex justify-center">
          <span>SignUp</span>
        </button>
      </div>
    </div>
  );
};

interface InputLabelType {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputLabel({ label, placeholder, onChange }: InputLabelType) {
  return (
    <div className="flex flex-col mb-4 ">
      <label className="text-lg   mb-2  text-gray-800 font-bold">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 w-3xs"
      />
    </div>
  );
}

export default Auth;
