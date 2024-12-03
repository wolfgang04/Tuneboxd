import React from 'react';
import styles from '../styles/Login.module.css';

const SignUp: React.FC = () => {
  return (
    <div className={styles.container}>
      
      {/* Background GIF */}
      <div className={styles.background}></div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.welcome}>Sign Up 🎶</h2>
        <p className={styles.description}>
        Hello, user! Your Tuneboxd journey starts here. Fill up the information below to create your account.
        </p>

        <form className={styles.form}>
          <label className="text-sm text-left">Email</label>
          <input type="text" placeholder="example@email.com" required />

          <label className="text-sm text-left">Username</label>
          <input type="text" placeholder="example_username" required />
          
          <label className="text-sm">Password</label>
          <input type="password" placeholder="at least 8 characters" required />
      
          <label className="text-sm">Confirm Password</label>
          <input type="password" placeholder="at least 8 characters" required />
          
          <button type="submit" className={styles.signInButton}>Sign Up</button>
        </form>

        <footer className={styles.footer}>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
};

export default SignUp;