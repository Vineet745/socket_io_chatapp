const express = require("express");
const { GetAllUsers, UserController, loginUser } = require("../controller/UserController");

const router = express.Router();


router.post("/register",UserController)
router.post("/login",loginUser)
router.get("/alluser",GetAllUsers)
module.exports = router