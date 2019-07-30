import React, { Component } from 'react';
import { getMyRooms } from './chatrooms-api';

class UserRooms extends Component {
    state = {
        merooms : []
    }
    componentDidMount(){
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
                running
            </div>
        );
    }
}

export default UserRooms;