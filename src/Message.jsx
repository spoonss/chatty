import React, { Component } from "react";
// import { IncomingMessage } from "http";

class Message extends Component {
  render() {
    if (this.props.type === "incomingMessage") {
      let userColor = this.props.userColor;
      let nameColor = { color: userColor };
      console.log("color", nameColor);
      return (
        <div className="message">
          <span style={nameColor} className="message-username">
            {this.props.userName}
          </span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else return <div className="message-system">{this.props.content}</div>;
  }
}
export default Message;
