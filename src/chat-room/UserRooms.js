import React, { Component } from 'react';
import { getMyRooms } from './chatrooms-api';
import { destroy } from "./chatrooms-api";
import { Link } from "react-router-dom";
import "./style.css";

class UserRooms extends Component {
    
  state = {
    myrooms: []
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
        console.log(error);
        alert("Unautherized Access");
      });
  };

  componentDidMount() {
    const user = this.props.user;
    getMyRooms(user)
      .then(response => {
        const myrooms = response.data.rooms;
        this.setState({
          myrooms: myrooms
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div>
        <h2 className="title"> Chat Rooms </h2>
        <div className="room">
          {this.state.myrooms.map((room, index) => (
            <div key={index} className="single">
              <h3>{room.title}</h3>
              <Link to={`/chatrooms/${room._id}`}>
                <button className="link">Join +</button>
              </Link>
              <br />
              <Link to={`/chatrooms/${room._id}`}>
                <button
                  onClick={e => {
                    e.preventDefault();
                    this.destroy(room._id);
                  }}
                  className="link delete"
                >
                  Delete x
                </button>
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

export default UserRooms;