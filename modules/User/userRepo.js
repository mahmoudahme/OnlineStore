const User = require("../User/model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//update 
const UpdateUser = async(req , res)=>{
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          'lama'
        ).toString();
      }
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
}

//Delete 

const DeleteUser = async(req , res )=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}

// getAllUser 
const getAllUser = async (req , res)=>{
    const query = req.query.new;
  try {
    const users = query? await User.find().sort({ _id: -1 }).limit(5): await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

//getUser 

const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
}

module.exports = {UpdateUser , DeleteUser , getAllUser , getUser}