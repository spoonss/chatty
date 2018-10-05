import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map((message, index) => (
      <Message
        type={message.type}
        userName={message.username}
        content={message.content}
        userColor={message.color}
        key={index}
      />
    ));

    return <main className="messages">{messageList}</main>;
  }
}
export default MessageList;
