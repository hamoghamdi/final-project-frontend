import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './style.css'

class Home extends Component {
    render() {
        return (
          <div className="Home">
            <div className="welcome-1">
              <h1 className="welcome">
                Welcome to Mad Hat,
                <br />
                The Group Chat Application
              </h1>

              <h2>
                Enjoy Talking to others in all sorts of topics and make
                new friends!
              </h2>

              <Link to="/sign-up">
                <button className="join-us">Join Us!</button>
              </Link>
            </div>
          </div>
        );
    }
}

export default Home;