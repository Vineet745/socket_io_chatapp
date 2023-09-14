const UserModel = require("../model/User.js");

module.exports = {
  UserController: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //  validation on Registration
      if (!username) {
        return res.send({ message: "UserName is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }

      // Check user
      const existingUser = await UserModel.findOne({ email });
      //  Check Existing User
      if (existingUser) {
        return res.status(200).send({
          success: false,
          message: "User Already Register Please Login",
        });
      }

      // Register user
      // save
      const user = await new UserModel({
        username,
        email,
        password,
      }).save();
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registration",
        error,
      });
    }
  },
  GetAllUsers: async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await UserModel.find();

      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        users: users,
      });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error.message, // Include the error message for debugging.
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const {email,password} = req.body;
      const validateEmail = await UserModel.find({email:email})
      if(!validateEmail){
        res.send({ status: "failed", message: "email and password does not match 🙁🙁😥" });
      }else{
        res.status(200).send({ status: "success", message: "LOGIN SUCCESSFULLY",validateEmail});
      }
    } catch (error) {
      console.log("error", error);
    }
  },
};
