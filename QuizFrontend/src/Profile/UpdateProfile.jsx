import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './UpdateProfile.module.css'
const UpdateProfile = () => {
  const [fname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data,setdata]=useState("")
 
  const token = localStorage.getItem("token");
 const userId=localStorage.getItem("userId");

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
    }, [token]);
    useEffect(()=>{
        if(data){
           setName(data.user.fullname)
          setEmail(data.user.email)
        }
    },[data])

  // Handle input changes
  const changeHandler = (e) => {
    if (e.target.id === "name") setName(e.target.value);
     if (e.target.id === "email") setEmail(e.target.value);
  };



 
  if (!data) return <div>Loading...</div>;

const  changeSave=()=>{
   const datatosend={
    email:email,
    fullname:fname 
   }
  //   try {
  //     const response = await axios.put(
  //         ,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     setdata(response.data.data);
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };
}
  return (
    <div className={style.body}>
      <div className={style.container}>
          <h1 className={style.title}>Update your Profile</h1>
          <div>
      <input
        type="text"
        id="name"
        value={fname}
        onChange={changeHandler}
      />
      </div>
      <div>
      <input
        type="email"
        id="email"
        value={email}
        onChange={changeHandler}
      />
      </div>
      <div>
        <button onClick={changeSave}>Save changes</button>
      </div>
    </div>
      </div>
  );
};

export default UpdateProfile;
