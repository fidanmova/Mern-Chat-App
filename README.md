
# Chat

## Client: React JS

## Server: Node JS, Express JS

## Database: Mongo DB


# Deployment

##  Client side 
 
###  don't use ENDPOINT  on socket.io
###  npm run build
###  in order to check localhost add proxy url to package json 
      "proxy":"http://localhost:5000"
###  add deployment url to client side. 
    // const ENDPOINT = "http://localhost:5000";
       const ENDPOINT = "https://chat-j1bt.onrender.com";
 
## Server side

###  don't use cors object on socket.io 
###  delete all from inside public folder and pass content of build folder from frontend
###  to deploy push only server side application on render
###  add below lines to  server.js.Don't forget in order to check the localhost, app.get needs to be commented out and localhost needs to be changed to deployed URL. 

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
    );

    const io = require("socket.io")(server, {
    cors: {
       origin: "https://chat-j1bt.onrender.com",
    // origin: "http://localhost:5000",
    },
    });