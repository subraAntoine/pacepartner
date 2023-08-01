const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authToken = require('../middlewares/authToken');
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
        res.status(401).json({message: "Adresse mail ou mot de passe incorrect"});
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        res.status(401).json({message: "Adresse mail ou mot de passe incorrect"});
        return;
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.cookie("jwt", token, {httpOnly: true});
    res.status(200).json({message: "User logged in"});
})


router.post('/logout', (req, res) => {

    res.clearCookie("jwt");
    res.status(200).json({message: "User logged out"});
})

router.get('/user', authToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
            res.status(200).json({ user: user });
        }
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations utilisateur" });
    }
})


module.exports = {userRouter: router}