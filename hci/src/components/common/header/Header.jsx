import React, { useState, useEffect } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loginStatus') === 'success');
  const navigate = useNavigate(); // Hook to navigate after sign out

  // Handle sign-out logic
  const handleSignOut = () => {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/signin-signup'); // Redirect to sign-in page after sign out
  };

  return (
    <>
      <header>
        <div className='container flex'>
          <Link to='/' className='logo'>
            <img src='./images/logo.png' alt='Logo' />
          </Link>
        
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className='button flex'>
            {isLoggedIn ? (
              <button className='btn1' onClick={handleSignOut}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
              </button>
            ) : (
              <Link to='/signin-signup' className='btn1'>
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign In
              </Link>
            )}
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>
              <FontAwesomeIcon icon={navList ? faTimes : faBars} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
