import React from "react";
import styles from "../../styles/Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from "../../SERVER";

const ResetPass: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${server}user/resetPassword`,
        { email, username, password, confirmPassword },
        { withCredentials: true });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  return (
    <div className={styles.container}>
      {/* Background GIF */}
      <div className={styles.background}></div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.welcome}>Forgot Password 🔐</h2>
        <p className={styles.description}>
          No worries! Re-enter your information below with your new password.
        </p>

        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <label className="text-left text-sm">Email</label>
          <input type="text" placeholder="example@email.com" value={email} onChange={(e) => handleEmailChange(e)} required />

          <label className="text-left text-sm">Username</label>
          <input type="text" placeholder="username" value={username} onChange={(e) => handleUsernameChange(e)} required />

          <label className="text-left text-sm">New Password</label>
          <input type="password" placeholder="at least 8 characters" value={password} onChange={(e) => handlePasswordChange(e)} required />

          <label className="text-left text-sm">Confirm Password</label>
          <input type="password" placeholder="at least 8 characters" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e)} required />

          <button type="submit" className={styles.signInButton}>
            Submit
          </button>
        </form>

        <footer className={styles.footer}>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
};

export default ResetPass;