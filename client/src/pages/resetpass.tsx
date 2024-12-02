import React from 'react';
import styles from '../styles/Login.module.css';

const ResetPass: React.FC = () => {
  return (
    <div className={styles.container}>
      
      {/* Background GIF */}
      <div className={styles.background}></div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.welcome}>Forgot Password 🔐</h2>
        <p className={styles.description}>
            No worries! Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form className={styles.form}>
          <label className="text-sm text-left">Email</label>
          <input type="text" placeholder="example@email.com" required />

          <button type="submit" className={styles.signInButton}>Submit</button>
        </form>

        <footer className={styles.footer}>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
};

export default ResetPass;