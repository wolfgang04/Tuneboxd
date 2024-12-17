import React from "react";
import styles from "../../styles/Login.module.css";

const ResetPass: React.FC = () => {
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

        <form className={styles.form}>
          <label className="text-left text-sm">Email</label>
          <input type="text" placeholder="example@email.com" required />

          <label className="text-left text-sm">Username</label>
          <input type="text" placeholder="username" required />

          <label className="text-left text-sm">New Password</label>
          <input type="text" placeholder="at least 8 characters" required />

          <label className="text-left text-sm">Confirm Password</label>
          <input type="text" placeholder="at least 8 characters" required />

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