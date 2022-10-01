const express = require("express");
const router = express.Router();
// const check_auth = require("../middleware/check_auth");

//import user controller
const UserController = require("../controllers/user");

router.get("/getUsers",UserController.getUsers);
router.post("/addUser", UserController.addUser);
router.patch("/updateUser/:userId",UserController.editUser);
router.delete("/deleteUser/:userId",UserController.deleteUser);

module.exports = router;