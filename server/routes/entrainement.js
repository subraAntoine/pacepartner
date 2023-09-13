const express = require('express');
const {EntrainementModel} = require('../model/Entrainement');
const {UserModel} = require('../model/User');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router.post('/create', authToken, async (req, res) => {
    try {
        const data = req.body;
        const newEntrainement = new EntrainementModel(data);
        newEntrainement.organisateur = req.userId;
        await newEntrainement.save();
        res.status(200).json({message: "Entrainement créé avec succès !"});
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la création de l'entrainement", error: error});
    }
});

router.get('/all', authToken, async (req, res) => {
    try {
        const entrainements = await EntrainementModel.find();

        res.status(200).json({entrainements: entrainements});
    } catch (error) {
        res.status(500).json({message: "Erreur lors de la récupération des entrainements", error: error});
    }
});

router.get('/userPseudo/:pseudoUserID', authToken, async (req, res) => {
   try{
       const userID = req.params.pseudoUserID;
         const userPseudo = await UserModel.findById(userID, {pseudo: 1, _id: 0});
         res.status(200).json({userPseudo: userPseudo});
   } catch (error) {
       res.status(500).json({message: "Erreur lors de la récupération du nom de l'organisateur", error: error});
   }
});

router.post('/joinEntrainement/:entrainementID', authToken, async (req, res) => {
    try{
        const entrainementID = req.params.entrainementID;
        const userID = req.userId;
        const entrainement = await EntrainementModel.findById(entrainementID);
        if (entrainement.participants.length < entrainement.nbMaxParticipants) {
            entrainement.participants.push(userID);
            await entrainement.save();
            res.status(200).json({message: "Vous avez rejoint l'entrainement !"});
        } else {
            res.status(500).json({message: "L'entrainement est complet !"});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de l'ajout de l'utilisateur à l'entrainement", error: error});
    }
});



module.exports = {entrainementRouter: router};