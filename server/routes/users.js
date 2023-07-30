const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {UserModel} = require('../model/User');

const router = express.Router();

router.post('/register', async (req, res) => {
        const {email, password, nom, prenom, sports} = req.body;
        const user = await UserModel.findOne({email});

        if (user) {
            res.status(409).json({message: "User already exists"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({email, password: hashedPassword, nom, prenom, sports});
        await newUser.save();
        res.status(201).json({message: "User created"});
    }
)

module.exports = {userRouter: router}