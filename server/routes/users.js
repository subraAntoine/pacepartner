const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {UserModel} = require('../model/User');

const router = express.Router();

router.post('/register', async (req, res) => {
        const {email, password, pseudo, nom, prenom, sports} = req.body;
        const user = await UserModel.findOne({email});
        const pseudoUser = await UserModel.findOne({pseudo});
        console.log(pseudo)

        if (user) {
            res.status(409).json({message: "User already exists"});
            return;
        }

        if (pseudoUser) {
            res.status(409).json({message: "Pseudo already exists"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({email, password: hashedPassword, pseudo, nom, prenom, sports});
        await newUser.save();
        res.status(201).json({message: "User created"});
    }
)

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    if(!user){
        res.status(401).json({message: "Invalid credentials"});
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        res.status(401).json({message: "Invalid credentials"});
        return;
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.cookie("jwt", token, {httpOnly: true});
})



module.exports = {userRouter: router}