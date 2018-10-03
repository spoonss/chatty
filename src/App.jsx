import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import conversations from "./conversations.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { conversations };
    this.addNewMessage = this.addNewMessage.bind(this);
  }
  addNewMessage = msg => {
    const newMessage = {
      username: this.state.conversations[0].currentUser.name,
      content: msg
    };
    const messages = this.state.conversations[0].messages.concat(newMessage);
    this.state.conversations[0].messages = messages;
    this.setState({ conversations });
  };

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.conversations[0].messages.concat(newMessage);
      console.log(messages);
      this.state.conversations[0].messages = messages;
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ conversations });
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.conversations[0].messages} />
        <ChatBar
          addNewMessage={this.addNewMessage}
          userName={this.state.conversations[0].currentUser.name}
        />
      </div>
    );
  }
}
export default App;
