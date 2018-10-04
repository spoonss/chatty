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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client connected");
  ws.on("message", function incoming(newMessage) {
    console.log("received: %s", newMessage);
    let message = JSON.parse(newMessage);
    // console.log("User", message.username, "said", message.content, "id", id);
    let messageFromServer = {
      id: uuidv4(),
      username: message.username,
      content: message.content
    };

    // Broadcast everyone
    wss.clients.forEach(function each(client) {
      if (client.readyState === WSocket.OPEN) {
        console.log("Sending to Client");
        client.send(JSON.stringify(messageFromServer));
      }
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on("close", () => console.log("Client disconnected"));
  });
});
