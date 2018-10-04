import React, { Component } from "react";
// import { IncomingMessage } from "http";

class Message extends Component {
  render() {
    if (this.props.type === "incomingMessage") {
      return (
        <div className="message">
          <span className="message-username">{this.props.userName}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else return <div class="message system">{this.props.content}</div>;
  }
}
export default Message;
