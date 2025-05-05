import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <h1 className="title">Quiz App</h1>
      <div className="signup-box">
        <h2>Create an account</h2>
        <p>Enter your email to sign up for this app</p>
        <input type="email" placeholder="Email" className="email-input" />
        <button className="email-button">Sign up with email</button>
        <div className="divider">or continue with</div>
        <button className="google-button">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Google
        </button>
        <p className="terms">
          By clicking continue, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
