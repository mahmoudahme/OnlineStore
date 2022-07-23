const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const UserRepo = require ('../modules/User/userRepo');

const router = require("express").Router();

//UPDATE
router.put("/api/users/:id", verifyTokenAndAuthorization, UserRepo.UpdateUser);

//DELETE
router.delete("/api/users/:id", verifyTokenAndAuthorization, UserRepo.DeleteUser);

//GET USER
router.get("/api/users/find/:id", verifyTokenAndAdmin, UserRepo.getUser);

//GET ALL USER
router.get("/api/users/", verifyTokenAndAdmin, UserRepo.getAllUser);

module.exports = router;
