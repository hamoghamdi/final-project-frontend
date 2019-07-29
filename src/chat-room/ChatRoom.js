import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import "./style.css";
import { show } from './chatrooms-api'

class ChatRoom extends Component {
  state = {
    room: {}, /// 
    endpoint: "http://localhost:3000",
    newMessage: { message: "" }, // {meassage: "" , sender: "" }
    user: "",
    newUser: "",
    onlineUsers: [],
    messageList: [] // [ newMessage{}, newMessage{} ]
  };

  sendMessage = event => {
    event.preventDefault();
    const room = this.props.roomId;
    const isEmpty = this.state.newMessage.message === "";
    const mess = JSON.stringify(this.state.newMessage)
    console.log("room id in mssg sending "+ room)
    const socket = socketIOClient(this.state.endpoint);
    if (!isEmpty) {
      socket.emit("send", {room: room, meassage: mess});
      // socket.emit("send message", JSON.stringify(this.state.newMessage));

      this.setState({ newMessage: { message: "" } });
    }
  };

  addtoMessageList = mssg => {
    // recive bc mssg
    const newMssg = mssg;
    let list = this.state.messageList;
    list.push(newMssg);
    this.setState({ messageList: list });
  };

  handleChange = event => {
    const mssg = event.target.value;
    const sender = this.state.user;
    this.setState({ newMessage: { message: mssg, sender: sender } });
  };

  userJoin = () => {
    const userName = prompt("Please enter your name", "new user");
    this.setState({ user: userName });
    const data = {userName: userName, room: this.props.roomId}
    return data
    // this.isOnline(data); // announce a new user joining it // must be editted to limit users joining a spicific room 
  };

  // /* 
  isOnline = data => {
    console.log(data.userName + " kkkkkkkkkkkkkkkkkkk");
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("new user", data);
  }; 
  // */

  newUserEntered = name => {
    console.log("new user entered " + name);
    this.setState({ newUser: name });
  };

  componentDidMount() {
    
    const user = this.props.user;
    const roomId = this.props.roomId;
    console.log("wwwwwwwwww " + roomId )
    show(user, roomId)
      .then(response => {
        const showRoom = JSON.stringify(response.data.room);
        console.log("in component did mount " + showRoom)
        this.setState({
          room: showRoom
        });
      })
      .catch(error => console.log(error));
    ///
    const data = this.userJoin(); // prompts user for nickname
    ///
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('subscribe', data) // send roomid and username 
    ///
    



    /* 
    // const socket = socketIOClient(this.state.endpoint);
    socket.on("new user", username => {
      this.newUserEntered(username); // i forgot what this do exactly and how it is different, gotta check back 
    }); 
    */

    socket.on("message", mssg => {
      console.log(mssg.meassage);
      const msg = JSON.parse(mssg.meassage);
      this.addtoMessageList(msg); // add message for view
      console.log("message recieved on client " + mssg);
    });

    // recivee online users
    socket.on("online users", data => {
      let users =[];
      data.map(element => {
        if (element.room === this.props.roomId)
        users.push(element.userName)
      })
console.log("data is", data)
      this.setState({ onlineUsers: users });
      console.log(this.state.onlineUsers)
    });
    

  }

  render() {
    return (
      <div>
    
        <div className="Main">
          <div className="ChatRoom">
            {this.state.user ? (
              <div>
                <h3 className="thisUser">
                  {" "}
                  You joined in as{" "}
                  <span className="user">{this.state.user}</span>{" "}
                </h3>
              </div>
            ) : (
              ""
            )}

            {this.state.newUser ? (
              <p className="lastJoin">
                <b>{this.state.newUser}</b> joined the chat
              </p>
            ) : (
              ""
            )}

            {this.state.newMessage
              ? this.state.messageList.map((mssg, indx) => (
                  <Message key={indx} mssg={mssg} />
                ))
              : ""}

            <form
              className="MessageForm"
              onSubmit={event => this.sendMessage(event)}
            >
              <div className="input-container">
                <input
                  type="text"
                  name="message"
                  onChange={this.handleChange}
                  placeholder="Enter your message..."
                  value={this.state.newMessage.message}
                />
              </div>
              <div className="button-container">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>

          <div className="online-users">
            <h3>online users</h3>
            {this.state.onlineUsers.map((usr, indx) => (
              <h4 key={indx}>{usr}</h4>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
