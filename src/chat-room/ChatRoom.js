import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import "./style.css";

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
    const socket = socketIOClient(this.state.endpoint);
    const isEmpty = this.state.newMessage.message === "";
    if (!isEmpty) {
      socket.emit("send message", JSON.stringify(this.state.newMessage));
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
    this.isOnline(userName);
  };

  isOnline = name => {
    console.log(name + " kkkkkkkkkkkkkkkkkkk");
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("new user", name);
  };

  newUserEntered = name => {
    console.log("new user entered " + name);
    this.setState({ newUser: name });
  };

  componentDidMount() {
    ///
       const user = this.props.user;
    const roomId = this.props.roomId;
    show(user, roomId)
      .then(response => {
        const showRoom = response.data;
        console.log(showRoom)
        this.setState({
          meme: showRoom
        });
      })
      .catch(error => console.log(error));
    ///

    this.userJoin();

    const socket = socketIOClient(this.state.endpoint);
    socket.on("new user", username => {
      this.newUserEntered(username);
    });

    socket.on("send message", mssg => {
      const msg = JSON.parse(mssg);
      this.addtoMessageList(msg);
      console.log("message recieved on client " + mssg);
    });

    socket.on("online users", users => {
      this.setState({ onlineUsers: users });
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
