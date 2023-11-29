import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  function renderHomeGoTo() {
    navigate("/home");
  }
  function createAccountGoTo() {
    navigate("/create");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can add authentication logic to check the username and password
    // For example, send a request to your server to validate the credentials.
    
    var endpoint = process.env.REACT_APP_APP_BASE_URL + 'Users/login'
    axios.post(endpoint, {
      userName: username,
      pwd: password
    })
    .then(function (response) {
      localStorage.setItem('loggedIn',true);
      
      localStorage.setItem('userId',response.data.userId);
      renderHomeGoTo();
    })
    .catch(function (error) {
      localStorage.setItem('loggedIn',false);
      toast.error(error.response ? error.response.data : "Error Logging in!");
    });

  };
  const loginAsGuest = (e) => {
    e.preventDefault();
    
    //load home page
    localStorage.setItem('loggedIn',true);
    renderHomeGoTo();
  };
  const createAccount = (e) => {
    e.preventDefault();
    
    createAccountGoTo();
  };

  return (
    <>
    <div><Toaster/></div>
    <h1 className='login-header'>CrowdQ</h1>
    <div className='login-container'>
        <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div className="form-group">
            <input
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <br />
              <a onClick={createAccount} href='/'>Create Account</a>
                <br />
              <a onClick={loginAsGuest} href='/'>Continue as Guest</a>
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
        </div>
    </div>
    </>
  );
};

export default Login;