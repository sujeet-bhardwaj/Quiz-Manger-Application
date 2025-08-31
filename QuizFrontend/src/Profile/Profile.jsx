import React, { useEffect, useState, useContext } from 'react';
import image from "../assets/default.png";
import style from "./Profile.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from "react-icons/md";
import axios from 'axios';
import { AiOutlineLogout } from "react-icons/ai";

const Profile = () => { 
  const navigate=useNavigate()
  const [data,setdata]=useState({})
    const token = localStorage.getItem("token");
    const userId=localStorage.getItem("userId");
  const myprofile=()=>{
   navigate("/updateprofile")
  
  }
const logouthandler = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setdata(response.data.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
    useEffect(() => {
      fetchData();
    }, []);
  console.log("data is ", data?.user?.fullname);
  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.header}>
          <img src={image} alt="profile" width="45" />
          <div className={style.subheader}>
            <h5>{data?.user?.fullname|| "Loading..."}</h5>
            <h6 className={style.email}>{ data?.user?.email ||" loading..profile email"}</h6> 
          </div>
        </div>
        <div className={style.middle}>
          <div>
            <Link to="/myprofile">My Profile</Link>
            <MdArrowForwardIos size={20} onClick={myprofile} />
          </div>
          <div>
            <Link to="/report">My Report</Link>
            <MdArrowForwardIos size={20} />
          </div>
        </div>

        <div className={style.logout} onClick={logouthandler}>
          <div className={style.log}>
          <AiOutlineLogout size={20}/>Logout
          </div>
            <MdArrowForwardIos size={20} onClick={logouthandler} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
