import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import server from "../../SERVER";
import Navbar from "../Navbar/Navbar";

const AuthNavbar = () => {
  const navigate = useNavigate();

  const checkStatus = async () => {
    try {
      await axios.get(`${server}user/status`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default AuthNavbar;
