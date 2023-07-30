const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {UserModel} = require('../model/User');

const router = express.Router();

router.post('/register', async (req, res) => {
        const {email, password, pseudo, nom, prenom, sports} = req.body;
        const user = await UserModel.findOne({email});
        const pseudoUser = await UserModel.findOne({pseudo});


        if (user) {
            return res.status(409).json({message: "Email déjà utilisé, connectez vous ou utilisez une autre adresse mail."});

        }

        if (pseudoUser) {
            return res.status(409).json({message: "Pseudo déjà utilisé, choisissez en un autre."});

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({email, password: hashedPassword, pseudo, nom, prenom, sports});
        await newUser.save();
        res.status(200).json({message: "User created"});
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