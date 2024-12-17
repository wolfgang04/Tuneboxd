import React from "react";
import styles from "../../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../SERVER";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${server}user/signup`, {
        email,
        username,
        password,
        confirmPassword,
      });

      if (res.status === 201) navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background GIF */}
      <div className={styles.background}></div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.welcome}>Sign Up 🎶</h2>
        <p className={styles.description}>
          Hello, user! Your Tuneboxd journey starts here. Fill up the
          information below to create your account.
        </p>

        <form className={styles.form} onSubmit={(e) => handleSignUp(e)}>
          <label className="text-left text-sm">Email</label>
          <input
            type="text"
            placeholder="example@email.com"
            required
            value={email}
            onChange={(e) => handleChangeEmail(e)}
          />

          <label className="text-left text-sm">Username</label>
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={(e) => handleChangeUsername(e)}
          />

          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="at least 8 characters"
            required
            value={password}
            onChange={(e) => handleChangePassword(e)}
          />

          <label className="text-sm">Confirm Password</label>
          <input
            type="password"
            placeholder="at least 8 characters"
            required
            value={confirmPassword}
            onChange={(e) => handleChangeConfirmPassword(e)}
          />

          <button type="submit" className={styles.signInButton}>
            Sign Up
          </button>
        </form>

        <footer className={styles.footer}>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
};

export default SignUp;
