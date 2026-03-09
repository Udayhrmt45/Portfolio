import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const login = async (req, res) => {
    const { email, password} = req.body;
    const[users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if(users.length === 0){
        return res.status(404).json({
            message : "User not found"
        })
    }

    const isMatch = await bycrypt.compare(password, users[0].password);

    const user = users[0];

    if(!isMatch){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn : "1d"
    })

    res.json({token});
}

export const logout = async(req, res) => {
    try {
        res.json({message : "Logged out"});
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}