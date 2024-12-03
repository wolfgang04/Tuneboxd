import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      
      {/* Background GIF */}
      <div className={styles.background}></div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <h2 className={styles.welcome}>Welcome Back 👋</h2>
        <p className={styles.description}>
          Today is a new day. It’s your day. You shape it. Log in to start managing your projects.
        </p>

        <form className={styles.form}>
          <label className="text-sm text-left">Username</label>
          <input type="text" placeholder="example_username" required />
          
          <label className="text-sm">Password</label>
          <input type="password" placeholder="at least 8 characters" required />
          
          <div className={styles.options}>
            <Link to="/resetpass" className="text-sm">Forgot Password?</Link>
          </div>
          
          <button type="submit" className={styles.signInButton}>Log In</button>
        </form>
        
        <p className={styles.signupText}>
          You don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <footer className={styles.footer}>© 2024 ALL RIGHTS RESERVED</footer>
      </div>
    </div>
  );
};

export default Login;