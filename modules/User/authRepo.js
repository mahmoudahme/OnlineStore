const User = require("../User/model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register 
const register = async(req , res )=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          'lama'
        ).toString(),
      });
    
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
}
//LogIn
const login = async(req , res)=>{
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );
        
        if(!user){
            res.status(401).json("Wrong User Name");
        }else{
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                "lama"
            );
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            const inputPassword = req.body.password;

            if(originalPassword != inputPassword){
                res.status(401).json("Wrong Password");
            }else{
                const accessToken = jwt.sign(
                    {
                        id: user._id,
                        isAdmin: user.isAdmin,
                    },
                    "lama",
                        {expiresIn:"1d"}
                    );
                    // const { password, ...others } = ;  
                    res.status(200).json({...user._doc, accessToken});
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports = {register , login}