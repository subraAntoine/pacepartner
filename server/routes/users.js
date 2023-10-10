const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authToken = require('../middlewares/authToken');
const {UserModel} = require('../model/User');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');


const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../Images'));

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});


router.post('/uploadProfilePic', authToken, upload.single('file'), async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        else {
            if(user.photo){
                const filePath = path.join(__dirname, '../Images', user.photo);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                } else {
                    console.log(`Le fichier "${filePath}" n'existe pas.`);
                }
            }
            user.photo = req.file.filename;
            await user.save();
            res.status(200).json({ message: "Photo de profil mise à jour", filename: req.file.filename });
        }



    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de la photo de profil" });
        console.log(err);
    }

});


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


router.post('/logout', authToken, async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Utilisateur déconnecté" });

    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la déconnexion de l'utilisateur" });
    }
});

router.post('/user', authToken, async (req, res) => {


    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {

            res.status(404).json({ message: "Utilisateur non trouvé" });

        } else {
            const userWithoutPassword = {...user._doc};
            delete userWithoutPassword.password;
            if(user.photo){
                const photo = 'http://localhost:3002/images/' + user.photo;
                userWithoutPassword.photo = photo;
            }
            if (user.dateNaissance){
                const dateNaissance = user.dateNaissance.toISOString().split('T')[0];
                userWithoutPassword.dateNaissance = dateNaissance;
            }





            res.status(200).json({ user: userWithoutPassword });
        }
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations utilisateurrr" });
    }
})

router.post('/isloged', authToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
                res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
            res.status(200).json({ message: "Utilisateur connecté" });
        }
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des informations utilisateur" });
    }
})

router.post('/update', authToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        } else {
            for(const key in req.body){
                user[key] = req.body[key];
            }
            await user.save();
            res.status(200).json({ message: "Informations utilisateur mises à jour"});
        }
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des informations utilisateur" });
    }
})

router.get('/userProfilePic/:ID', authToken, async (req, res) => {
    try {
        const userID = req.params.ID;
        const profilePic = await UserModel.findById(userID, 'photo');
        console.log(profilePic);
        if (!profilePic) {
            res.status(404).json({ message: "Photo de profil non trouvée" });
        } else {
            const profilePicDir = 'http://localhost:3002/images/' + profilePic.photo;
            res.status(200).json({ profilePic: profilePicDir });
        }
    }

    catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la photo de profil" });
}});



module.exports = {userRouter: router}