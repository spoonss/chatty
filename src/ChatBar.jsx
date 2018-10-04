import React, { Component } from "react";

class ChatBar extends Component {
  onKeyDown = event => {
    if (event.key === "Enter") {
      this.props.addNewMessage(event.target.value);
    }
  };

  onKeyDownUserName = event => {
    if (event.key === "Enter") {
      this.props.updateUserName(event.target.value);
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onKeyDown={this.onKeyDownUserName}
          // defaultValue={this.props.userName}
        />
        <input
          className="chatbar-message"
          onKeyDown={this.onKeyDown}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}
export default ChatBar;
