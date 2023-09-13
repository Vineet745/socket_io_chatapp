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
app.get('/',(req,res)=>{
  res.send("welcome to chat app")
})
// Socket Connection




// Connection
io.on("connection", function (socket) {
  console.log("connected....");

  socket.on('join', (roomId) => {
    console.log("connnected to Room",roomId)
    socket.join(roomId);
  });


  socket.on("send_message", (data) => {
    const { text, receiverId } = data;
    io.to(receiverId).emit("new_message", { text, receiverId });
    console.log("emitable Text", text);
  });

  // Disconnect
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });

  

  

});

// User

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
