import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <h1>
      Welcome to Mad Hat,
      <br />
      The Group Chat Application
    </h1>

    <h2>
      Enjoy Talking to others in all sorts of topics and make new friends!
    </h2>
    
    <Link to="/sign-up">Join Us!</Link>
            </div>
        );
    }
}

export default Home;
