import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const checkStatus = async () => {
    try {
      await axios.get("http://localhost:8080/api/user/status", {
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
      <Outlet />
    </>
  );
};

export default Auth;
