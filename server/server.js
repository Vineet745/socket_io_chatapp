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

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("connected....");

  
  const addUser = (roomId, socketId) => {
    !activeUsers.some((user) => user.userId === roomId) &&
    activeUsers.push({ roomId, socketId });
};
const getUser = (roomId) => {
    console.log("userId ", roomId)
    return activeUsers.find((user) => user.roomId === roomId);
};

// socket.on("new-user-add", (userId) => {
//   try {
//     socket.join(userId)
//     console.log(userId)
//     addUser(userId, socket.id);
//     console.log("users = ", activeUsers);
//     io.emit("getUsers", activeUsers);
//   } catch (error) {
//     console.error("Error in addUser:", error);
//       socket.emit("error", "An error occurred while adding user.");
//   }
// });


socket.on("new-user-add", (roomId) => {
  try {
    socket.join(roomId)
    console.log(roomId)
    addUser(roomId,socket.id)
    console.log("users = ", activeUsers);
    io.emit("getUsers", activeUsers);
  } catch (error) {
    console.error("Error in addUser:", error);
      socket.emit("error", "An error occurred while adding user.");
  }
});



//   socket.on("send_message", (data) => {
//     const user = getUser(data.receiverId);
//     console.log(`Sending from socket to: ${data.receiverId}`);
//     if (!user) {
//       console.log("receiver not found");
//       return;
//     }
//     console.log(data.receiverId)
//     socket.to(data.receiverId).emit("new_message", data); 
//   });
// });


socket.on("send_message", (data) => {
      const user = getUser(data.roomId);
      console.log(`Sending from socket to: ${data.roomId}`);
      if (!user) {
        console.log("receiver not found");
        return;
      }
      console.log(data.receiverId)
      socket.to(user.roomId).emit("new_message", data); 
    });
  });


// User

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
