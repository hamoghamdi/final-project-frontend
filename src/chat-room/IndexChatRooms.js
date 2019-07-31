import React, { Component } from 'react';
import {index, destroy } from './chatrooms-api'
import { Link } from "react-router-dom";
import "./style.css";

class IndexChatRooms extends Component {
  state = {
    rooms: []
  };


  componentDidMount() {
    const user = this.props.user;
    index(user)
      .then(response => {
        console.log(response);
        const rooms = response.data.rooms;
        this.setState({
          rooms: rooms
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="room-index">
        <h2 className="title"> Chat Rooms </h2>
        <div className="room">
          {this.state.rooms.map((room, index) => (
            <div key={index} className="single">
              <h3>{room.title}</h3>
              <Link to={`/chatrooms/${room._id}`}>
                <button className="link">Join +</button>
              </Link>
              
            </div>
          ))}
        </div>
        <Link to={`/create`}>
          <button className="link create">Create new room +</button>
        </Link>
      </div>
    );
  }
}

export default IndexChatRooms;