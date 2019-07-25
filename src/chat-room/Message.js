import React, { Component } from "react";

class Message extends Component {
  render() {
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return (
      <p className="Message">
        <span className="sender" style={{ color: randomColor }}>
          {this.props.mssg.sender}{" "}
        </span>
        {this.props.mssg.message}
      </p>
    );
  }
}

export default Message;
