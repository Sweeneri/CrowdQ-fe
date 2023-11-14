// Navigation.js
import React, { useState }  from "react";
import './Navigation.css'
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };
  const navigate = useNavigate();
  
  const home = (e) => {
    e.preventDefault();

    navigate('/home');
  }
  const logout = (e) => {
    e.preventDefault();

    localStorage.setItem('loggedIn',false);
    navigate('/login');
  }
  const startSession = (e) => {
    e.preventDefault();

    navigate('/session/create');
  }
  const joinSession = (e) => {
    e.preventDefault();

    navigate('/session/join');
  }
  const accountSettings = (e) => {
    e.preventDefault();

    navigate('/account');
  }
  return (<>
    <div className="navbar">
      <div className="navbar-logo" onClick={home}>CrowdQ</div>
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="/" onClick={startSession}>Start Session</a>
          <a href="/" onClick={joinSession}>Join Session</a>
          <a href="/" onClick={accountSettings}>Account</a>
          <a href="/" onClick={logout}>Logout</a>
      </div>
      <div className={`hamburger-menu ${menuOpen ? "open" : "close"}`} onClick={handleMenuToggle}>
        <div className={`bar ${menuOpen ? "change" : ""}`}></div>
        <div className={`bar ${menuOpen ? "change" : ""}`}></div>
        <div className={`bar ${menuOpen ? "change" : ""}`}></div>
      </div>
      
    </div>
    <div className={`hamburger-links ${menuOpen ? "open" : "close"}`}>
      <div className={`hamburger-link ${menuOpen ? "open" : ""}`}><a href="/" onClick={startSession}>Start Session</a></div><br />
      <div className={`hamburger-link ${menuOpen ? "open" : ""}`}><a href="/" onClick={joinSession}>Join Session</a></div><br />
      <div className={`hamburger-link ${menuOpen ? "open" : ""}`}><a href="/" onClick={accountSettings}>Account</a></div><br />
      <div className={`hamburger-link ${menuOpen ? "open" : ""}`}><a href="/" onClick={logout}>Logout</a></div><br />
    </div>
  </>);
};

export default Navigation;