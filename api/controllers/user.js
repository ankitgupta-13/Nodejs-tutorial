require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../models/user");

exports.addUser = (req, res, next) => {
  //create user only if it is not present
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1)
        return res.status(409).json({ message: "Email already exists" });
      else {
        try {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: req.body.password,
          });
          user.save().then((result) => {
            console.log(result);
            res.status(201).json({
              message: "User Created",
            });
          });
        } catch (error) {
          res.status(500).json({
            message: "Internal Server Error",
            error: error,
          });
        }
      }
    });
};

exports.getUsers = (req, res, next) => {
  try {
    User.find()
      .select("_id email")
      .exec()
      .then((result) => {
        res.status(200).json({ result: result });
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
exports.editUser = (req, res, next) => {
  try {
    User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          password: req.body.password,
        },
      }
    )
      .exec()
      .then((result) => {
        res.status(200).json({ message: "User details updated successfully!" });
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    User.remove({ _id: req.params.userId })
      .exec()
      .then((result) => {
        res.status(200).json({ message: "User deleted successfully!" });
      });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};
