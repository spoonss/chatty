const express = require("express");
const WebSocket = require("ws").Server;
const uuidv4 = require("uuid/v4");
const WSocket = require("ws");
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new WebSocket({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  outgoingMessage = {
    type: "onlineUsersUpdate",
    content: wss.clients.size
  };
  //   console.log("check!", outgoingMessage);
  wss.broadcast(outgoingMessage);

  console.log("Client connected");
  ws.on("message", function incoming(newMessage) {
    console.log("received: %s", newMessage);
    let data = JSON.parse(newMessage);
    let outgoingMessage = {};
    // console.log(data);
    switch (data.type) {
      case "postMessage":
        outgoingMessage = {
          type: "incomingMessage",
          id: uuidv4(),
          username: data.username,
          content: data.content,
          color: data.color
        };
        break;

      case "postNotification":
        outgoingMessage = {
          type: "incomingNotification",
          id: uuidv4(),
          username: data.username,
          content: data.content
        };
        break;
    }
    console.log(outgoingMessage);
    // Broadcast everyone
    wss.broadcast(outgoingMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    outgoingMessage = {
      type: "onlineUsersUpdate",
      content: wss.clients.size
    };
    console.log("Client disconnected");
    //   console.log("CLOSED connections", wss.clients.size);
    wss.broadcast(outgoingMessage);
  });
});
