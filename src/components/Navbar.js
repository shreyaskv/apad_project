import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar=() => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isUserLoggedIn =  window.sessionStorage.getItem("uservalid")
    setLoggedIn(isUserLoggedIn);
  }, []);

 const handleLogout = () => {
  
  setClick(false);
  let url = "http://localhost:5000/logout"
  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        window.sessionStorage.setItem("uservalid",null)
        setLoggedIn(false); 
       
        console.log('User logged out successfully.');
        alert("Logged out successfully")
        window.location.href = "/Login";
      } else {
        console.error('Failed to logout. Please try again.');
        alert("Failed to logout. Please try again.")
      }
    })
    .catch((error) => {
      console.error('An error occurred during logout:', error);
    });
};
  
  return (
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          APAD
        </Link>
      
        {window.location.pathname === '/UserSignIn' && (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
        <React.Fragment >
          <Link to="/Login" className='nav-links' onClick={closeMobileMenu}>Login</Link>
        </React.Fragment>
        </li>
        </ul>
      )}

{window.location.pathname === '/Login' && (
  <ul className={click ? 'nav-menu active' : 'nav-menu'}>
  <li className='nav-item'>
        <React.Fragment >
          <Link to="/UserSignIn" className='nav-links' onClick={closeMobileMenu}>Sign In</Link>
        </React.Fragment>
        </li>
        </ul>
      )}

{window.location.pathname === '/project' && (
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
    <li className='nav-item'>
        
            <React.Fragment >
            <Link to="/Login" className='nav-links' onClick={handleLogout} >Logout</Link>
            </React.Fragment>
          
       
        </li>
        </ul>
      )}

{window.location.pathname === '/hardware' && (
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
    <li className='nav-item'>
        <React.Fragment >
          <Link to="/Login" className='nav-links' onClick={handleLogout} >Logout</Link>
        </React.Fragment>
        </li>
        </ul>
      )}
      {window.location.pathname === '/createProject' && (
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className='nav-item'>
        <React.Fragment >
          <Link to="/Login" className='nav-links' onClick={handleLogout}>Logout</Link>
        </React.Fragment>
        </li>
        </ul>
      )}
      </nav>
  );
}
export default Navbar;

