const  {UserController, GetAllUsers} = require("../controller/userController");
const express = require("express")

const router = express.Router();


router.post("/register",UserController)
router.get("/alluser",GetAllUsers)
module.exports = router