import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import axios from "axios";
import server from "../../SERVER";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${server}user/login`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      if (res.status === 200) navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background GIF */}
      <div className={styles.background}></div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.welcome}>Welcome Back 👋</h2>
        <p className={styles.description}>
          Today is a new day. It’s your day. You shape it. Log in to start
          managing your projects.
        </p>

        <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
          <label className="text-left text-sm">Username</label>
          <input
            type="text"
            placeholder="username"
            required
            onChange={(e) => handleChangeUsername(e)}
            value={username}
          />

          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => handleChangePassword(e)}
          />

          <div className={styles.options}>
            <Link to="/resetpass" className="text-sm">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className={styles.signInButton}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </form>

        <p className={`${styles.signupText} cursor-pointer hover:underline`}>
          <Link to="/signup"> You don't have an account? Sign up</Link>
        </p>

        <footer className={styles.footer}>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
};

export default Login;