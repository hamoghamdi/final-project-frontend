import React, { Component } from 'react';
import {index} from './chatrooms-api'
import { Link } from "react-router-dom";

class IndexChatRooms extends Component {

    state = {
        rooms: []
    }
  componentDidMount() {
    const user = this.props.user;
    index(user)
      .then(response => {
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
          {this.state.rooms.map((room, index)=>{
            <Link to={`/chatrooms/${room._id}`}>{room.title}</Link>

          })}
          <h3>create a room</h3>
            <Link to={`/create`}>Create new room</Link>
          
        <h1>this is an empty page </h1>
      </div>
    )
  }
}

export default IndexChatRooms;