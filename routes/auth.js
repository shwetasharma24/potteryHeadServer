const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        const {password, ...userRegistered} = savedUser._doc;
        res.status(201).json(userRegistered);
    }
    catch(err){
        res.status(500).json(err);
    }
})


//LOGIN
router.post("/login", async(req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});

        !user && res.status(401).json("This user does not exist!");
        
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json("Incorrect password, try again!");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            { expiresIn: "3d" },
        );

        const {password, ...otherInfo} = user._doc;

        res.status(200).json({...otherInfo, accessToken});
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;