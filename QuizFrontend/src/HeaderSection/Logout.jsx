import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

const Logout = () => {
  const { setlogin } = useContext(MyContext);
  const navigate = useNavigate();
   
  useEffect(() => {
    // Clear token and update state
    localStorage.removeItem("token");
    setlogin(false);

    // Redirect to login page after logout
    navigate("/login");
  }, [setlogin, navigate]);

  return null; // no UI, just performs logout
};

export default Logout;
