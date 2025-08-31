import React, { useState } from 'react'
import style from './Signup.module.css'
import image from '../assets/nature.jpg'
import axios from "axios";
import { MyContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
     const navigate = useNavigate();
    const {setlogin,setuserId} = useContext(MyContext);
   const[fullname,setfname]=useState("")
   const[email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const[confirmPassword,setConfirmPassword]=useState("")
   
  const submitHandler=()=>{
    const dataobject={
       fullname:fullname,
       email:email,
       password:password,
       confirmPassword:confirmPassword
    }
axios.post("http://localhost:3000/auth", dataobject)
  .then((res) => {
 
     const token = res.data.data.token; 
        setuserId(res.data.data.userId);
      localStorage.setItem("token",token);  // save token
    alert("register successful");  
    setfname("");   
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setlogin(true);
    navigate("/");
  })
  .catch((err) => {
   alert("error is ",err)
  });




    }
  const changeHandler=(e)=>{
        if(e.target.id==="email"){
         setEmail(e.target.value)
        }
        if(e.target.id==="password")
        {
            setPassword(e.target.value)
        }
          if(e.target.id==="fullname")
        {
            setfname(e.target.value)
        }
        if(e.target.id==="confirmpassword")
        {
            setConfirmPassword(e.target.value)
        }
      }
  return (
    <div className={style.body}>
          <div className={style.container}>
            <div className={style.leftblock}>
              <h1>Sign Up</h1>
                 <h3>Create Account</h3>
               <div className={style.inputtype}>
                <input type="text" placeholder="Full Name" id="fullname" value={fullname} onChange={changeHandler}/>
                <input type="text" placeholder="Email" id="email" value={email} onChange={changeHandler} /> 
                <input type="password" placeholder="Password" id="password" value={password} onChange={changeHandler}/>      
                  <input type="password" placeholder="Confirm Password" id='confirmpassword' value={confirmPassword} onChange={changeHandler}/>          
              </div>
                 <div className={style.submit}>
                    <input type="submit" onClick={submitHandler}/>
                 </div>
              </div>            
            <div className={style.rightblock}>
             <img src={image} alt=""  width="400"/>
            </div>
          </div>
    </div>
  )
}

export default SignUp
