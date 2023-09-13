const express = require("express");
const { GetAllUsers, UserController } = require("../controller/UserController");

const router = express.Router();


router.post("/register",UserController)
router.get("/alluser",GetAllUsers)
module.exports = router