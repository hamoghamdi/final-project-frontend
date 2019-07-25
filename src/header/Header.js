import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'
import './head.css'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
    <Link to="/chatrooms">Chat rooms</Link>
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
