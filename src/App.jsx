import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import conversations from "./conversations.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  //Add new Message
  addNewMessage = msg => {
    let newMessage = {
      // username: this.state.conversations[0].currentUser.name,
      username: this.state.currentUser.name,
      content: msg
    };
    this.ws.send(JSON.stringify(newMessage));
  };

  updateUserName = userName => {
    let newUserName = {
      name: userName
    };

    this.setState({
      currentUser: newUserName,
      messages: this.state.messages
    });

    // const messages = this.state.conversations[0].messages.concat(newMessage);
    // // this.state.conversations[0].messages = messages;
    // // this.setState({ conversations });
  };

  componentDidMount() {
    // create web socket connection
    this.ws = new WebSocket("ws://localhost:3001");
    this.ws.onmessage = event => {
      let incomingMessage = JSON.parse(event.data);
      let updatedmessages = this.state.messages.concat(incomingMessage);
      this.setState({
        currentUser: this.state.currentUser,
        messages: updatedmessages
      });
    };

    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    // const newMessage = {
    //   id: 3,
    //   username: "Michelle",
    //   content: "Hello there!"
    // };
    // const messages = this.state.conversations[0].messages.concat(newMessage);
    // const messages = this.state.messages.concat(newMessage);
    // console.log(messages);
    // this.state.messages = messages;
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState(this.state);
    // }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          addNewMessage={this.addNewMessage}
          userName={this.state.currentUser.name}
          updateUserName={this.updateUserName}
        />
      </div>
    );
  }
}
export default App;
