import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import server from "../../SERVER";

const Auth = () => {
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
      <Outlet />
    </>
  );
};

export default Auth;
