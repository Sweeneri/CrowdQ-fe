import React, { useState } from 'react';
import './Create-Account.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const CreateAccount = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  function loginGoTo() {
    navigate("/login");
  }
  function homeGoTo() {
    navigate("/home");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can add authentication logic to check the username and password
    // For example, send a request to your server to validate the credentials.
    debugger;
    var endpoint = process.env.REACT_APP_APP_BASE_URL + 'Users/'
    axios.post(endpoint, {
      userId: 0,
      firstName: firstname,
      lastName: lastname,
      userName: username,
      password: password,
    })
    .then(function (response) {
      debugger;
      localStorage.setItem('loggedIn',true);
      localStorage.setItem('userId',response.data.userId);
      
      homeGoTo();
    })
    .catch(function (error) {
      debugger;
      localStorage.setItem('loggedIn',false);
      alert("Error creating account. Please try again. " + error.response.data);
    });
  };
  const loginAsGuest = (e) => {
    e.preventDefault();
    
    //load home page
    localStorage.setItem('loggedIn',true);
    homeGoTo();
  };

  return (<>
    
    <h1 className='login-header'>CrowdQ</h1>
    <div className='login-container'>
        <div className="login-form-container">
        <h2>Create Account</h2>
        <form onSubmit={handleLogin}>
            <div className="form-group">
            <input
                type="text"
                placeholder='First Name'
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="text"
                placeholder='Last Name'
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </div>
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
              <a onClick={loginGoTo} href='javascript:;'>Login</a>
                <br />
              <a onClick={loginAsGuest} href='javascript:;'>Continue as Guest</a>
            <br />
            <br />
            <button type="submit">Create</button>
        </form>
        </div>
    </div>
    </>
  );
};

export default CreateAccount;