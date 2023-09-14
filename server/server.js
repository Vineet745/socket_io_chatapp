const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;
var bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes.js");

// create application/x-www-form-urlencoded parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cors

const cors = require("cors");
app.use(cors());

// Mongoose

mongoose.connect(
  "mongodb+srv://Vineet:Vineet@cluster0.gnz5z9r.mongodb.net/chatApp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api", authRoutes);


// Socket Connection

// Connection

let activeUsers = []

io.on("connection",  (socket)=> {
  console.log("connected....")

// add new User
socket.on('new-user-add',(newUserId)=>{
  console.log("newUserId",newUserId)
  if(!activeUsers.some((user)=>user.userId === newUserId)){
    activeUsers.push({
      userId:newUserId,
      socketId:socket.id
    })
    console.log("New user Connected",activeUsers)
    
  }
  io.emit('get-users',activeUsers)
})

// socket.on("disconnect",()=>{
//   activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id)
//   console.log("User Disconnected")
//   io.emit('get-users',activeUsers)

// })


  
socket.on("send_message", (data) => {
  console.log("data",data)
  const { receiverId } = data;
  const user = activeUsers.find((user) =>user.userId === receiverId)
  console.log("user",user)
  console.log("Sending from socket to :", receiverId)
  console.log("Data: ", data)
  if (user) {
    io.to(user.receiverId).emit("receive-message", data);
  }
});

});

// User

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
