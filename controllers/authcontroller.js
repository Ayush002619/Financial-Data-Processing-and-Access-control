const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //check is user already existing
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "user already existed" });
        }
        //hashing password
        const hashpassword = await bcrypt.hash(password, 10);
        //create user
        const user = await User.create({
            name,
            email,
            password: hashpassword,
            role,
        });
        return res.status(200).json({ message: "user created" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//login
exports.login = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //check is user already existing
        const existinguser = await User.findOne({ email });
        if (!existinguser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        //campare password
        const ismatch = await bcrypt.compare(password, existinguser.password);
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        //create token
        const token = jwt.sign({
            userId: existinguser._id, role: existinguser.role
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successfully", token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};