import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Message from "./Message";
import "./style.css";
import { show } from './chatrooms-api'
import apiUrl from "../apiConfig";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
const socket = socketIOClient(apiUrl);

class ChatRoom extends Component {
  state = {
    room: {}, ///
    endpoint: apiUrl,
    newMessage: { message: "" }, // {meassage: "" , sender: "" }
    user: "",
    socket: socket,
    // newUser: "",
    onlineUsers: [],
    messageList: [], // [ newMessage{}, newMessage{} ]
    emoji: "",
    showEmojis: false
  };

  showEmojis = e => {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  closeMenu = e => {
    console.log(this.emojiPicker);
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };

  sendMessage = event => {
    event.preventDefault();
    const room = this.props.roomId;
    const isEmpty = this.state.newMessage.message === "";
    const mess = JSON.stringify(this.state.newMessage);
    console.log("room id in mssg sending " + room);
    const socket = this.state.socket;
    if (!isEmpty) {
      socket.emit("send", { room: room, meassage: mess });
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
    let mssg;
    const sender = this.state.user;
    // if (this.state.emoji !== "") {
    //   mssg = event.target.value + this.state.emoji;
    //   this.setState({emoji: ""})
    // } else {
    mssg = event.target.value;
    // }
    this.setState({ newMessage: { message: mssg, sender: sender } });
  };

  userJoin = () => {
    const userName = prompt("Please enter your name", "new user");
    this.setState({ user: userName });
    const data = { userName: userName, room: this.props.roomId };
    return data;
    // this.isOnline(data); // announce a new user joining it // must be editted to limit users joining a spicific room
  };

  /*
  isOnline = data => {
    console.log(data.userName + " kkkkkkkkkkkkkkkkkkk");
    const socket = this.state.socket;
    socket.emit("new user", data);
  };
   

   newUserEntered = name => {
     console.log("new user entered " + name);
     this.setState({ newUser: name });
   };
  */

  addEmojiState = e => {
    //console.log(e.native)
    let emoji = e.native;
    let mssg;
    const sender = this.state.user;
    mssg = this.state.newMessage.message + emoji;

    this.setState({
      emoji: emoji,
      newMessage: {
        message: mssg,
        sender: sender
      }
    });
  };

  componentDidMount() {
    const user = this.props.user;
    const roomId = this.props.roomId;
    console.log("wwwwwwwwww " + roomId);
    show(user, roomId)
      .then(response => {
        const showRoom = response.data.room;
        console.log("in component did mount ", showRoom);
        this.setState({
          room: showRoom
        });
      })
      .catch(error => console.log(error));
    ///
    const data = this.userJoin(); // prompts user for nickname
    ///
    const socket = this.state.socket;
    socket.emit("subscribe", data); // send roomid and username
    ///

    /* 
    // const socket = this.state.socket;
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
      let users = [];
      data.map(element => {
        users.push(element.username);
      });
      console.log("data is", data);
      this.setState({ onlineUsers: users });
      console.log(this.state.onlineUsers);
    });
  }

  componentWillUnmount() {
    const socket = this.state.socket;
    socket.emit("forceDisconnect", this.props.roomId, this.state.user);
    console.log("will mount");
  }

  render() {
    return (
      <div>
        <div className="Main">
          <div className="ChatRoom">
            <h2 className="t">{this.state.room.title}</h2>
            {this.state.user ? (
              <div><h3 className="thisUser">
                {" "}
                You joined in as <span className="user">
                  {this.state.user}
                </span>{" "}
              </h3>
              </div>
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

              {this.state.showEmojis ? (
                <span
                  style={styles.emojiPicker}
                  ref={el => (this.emojiPicker = el)}
                >
                  <Picker
                    onSelect={this.addEmojiState}
                    emojiTooltip={true}
                    title="MadHatChat"
                  />
                </span>
              ) : (
                <p style={styles.getEmojiButton} onClick={this.showEmojis}>
                  {String.fromCodePoint(0x1f60a)}
                </p>
              )}

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

const styles = {

  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    cursor: "pointer"
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};