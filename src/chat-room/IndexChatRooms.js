import React, { Component } from 'react';
import {index, destroy } from './chatrooms-api'
import { Link } from "react-router-dom";

class IndexChatRooms extends Component {
  state = {
    rooms: []
  };

  destroy = roomId => {
    const user = this.props.user;
    destroy(user, roomId)
      .then(() => alert("Deleted"))
      .then(() => {
        const newRooms = this.state.rooms.filter(room => room._id !== roomId);
        this.setState({
          rooms: newRooms
        });
      })
      .catch(error => {
        console.log(error)
        alert("Unautherized Access")});
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
      <div>
        <h3> rooms: </h3>
        {this.state.rooms.map((room, index) => ( <div key={index}>
          <Link to={`/chatrooms/${room._id}`}>{room.title}</Link>
          <br />
          <Link to={`/chatrooms/${room._id}`}>
          <button onClick={(e) => {e.preventDefault()
            this.destroy(room._id)}}>Delete</button>
        </Link>
        </div>
        ))}
        <h3>create a room</h3>
        <Link to={`/create`}>Create new room</Link>
        
      </div>
    );
  }
}

export default IndexChatRooms;