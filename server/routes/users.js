const express = require('express');
const jwt = require('jsonwebtoken');

const {UserModel} = require('../model/User');

const router = express.Router();

router.post('/register', async (req, res) => {
        return res.json({message: 'register'});
    }
)

module.exports = {userRouter: router}