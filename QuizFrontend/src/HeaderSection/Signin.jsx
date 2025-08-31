import React, { useState } from 'react'
import style from "./Signin.module.css"
import happy from '../assets/happywoman.jpg'
import axios from "axios";
import { MyContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

const Signin = () => {
   const navigate = useNavigate();
   const {userId,setuserId}=useContext(MyContext)
   const {login,setlogin} = useContext(MyContext);
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("")
const submitHandler = async () => {
  try {
    const dataobject = {
      email: email,
      password: password,
    };
    const res = await axios.post("http://localhost:3000/auth/login", dataobject);
    const token = res.data.data.token;
    const userId=res.data.data.userId;
    setlogin(res.data.data.userId);
    setuserId(res.data.data.userId);
    localStorage.setItem("token", token); // save token
    localStorage.setItem("userId",userId)
    alert("login successful");
    setEmail("");
    setPassword("");
    setlogin(true);
    navigate("/");
  } catch (error) {
    console.log("error occured", error);
    alert("Login failed. Please check your credentials and try again.");
  }
};
  const changeHandler=(e)=>{
        if(e.target.id==="email"){
         setEmail(e.target.value)
        }
        if(e.target.id==="password")
        {
            setPassword(e.target.value)
        }
  }
  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.leftside}>
          <div className={style.title}>
            <h2> <span className={style.highlight}>Welcome</span>Back</h2>
            <h3>Please Enter Your Details</h3>
          </div>      
            <div className={style.input}>
              <input type="email" placeholder="Email" id="email" onChange={changeHandler} value={email} required/>
              <input type="password" placeholder="Password"  id="password" onChange={changeHandler} value={password} required/>
            </div>
            <div className={style.checkbox}>
                <input type="checkbox" /> 
                <span>Remember Me</span>
            </div>
            <div className={style.submit}>
              <input type="submit" onClick={submitHandler} />
            </div>
          <div className={style.signup}>
            <span>Don`t have an account?Sign Up</span>
          </div>
        </div>
        <div className={style.rightside}>
          <img src={happy} alt="Happy woman" className={style.image} />
        </div>
      </div>
    </div>
  );
};

export default Signin;
