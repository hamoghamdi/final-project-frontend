import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'
import './head.css'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/chatrooms">
      <button className="links">Chatrooms</button>
    </Link>
    <Link to="/myrooms">
      <button className="links">My rooms</button>
    </Link>
    {/* <Link to="/change-password">
      <button className="links txt">Change Password</button>
    </Link> */}
    <Link to="/sign-out">
      <button className="links">Sign Out</button>
    </Link>
  </React.Fragment>
);

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/">
      <button className="links">Home</button>
    </Link>
    <Link to="/sign-up">
      <button className="links">Sign Up</button>
    </Link>
    <Link to="/sign-in">
      <button className="links">Sign In</button>
    </Link>
  </React.Fragment>
);

const alwaysOptions = (
  <React.Fragment>
    {/* <Link to="/">Home</Link> */}
  </React.Fragment>
);

const Header = ({ user }) => (
  <header className="main-header Header">
    <h1>Mad Hat Group Chat</h1>
    <nav>
      {user && <span>Welcome, {user.email}</span>}
      {user ? authenticatedOptions : unauthenticatedOptions}
      {alwaysOptions}
    </nav>
  </header>
);

export default Header
