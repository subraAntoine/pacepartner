const express = require('express');
const {EntrainementModel} = require('../model/Entrainement');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router.post('/createEntrainement', authToken, async (req, res) => {
    try {
        const {dateEntrainement, heureEntrainement, typeEntrainement, lieuEntrainement, descriptionEntrainement, nbMaxParticipants, isPrivate, sportEntainement, distanceEntrainement, dureeEntrainement, deniveleEntrainement} = req.body;
        const entrainement = new EntrainementModel({
            dateEntrainement,
            heureEntrainement,
            typeEntrainement,
            lieuEntrainement,
            descriptionEntrainement,
            nbMaxParticipants,
            isPrivate,
            sportEntainement,
            distanceEntrainement,
            dureeEntrainement,
            deniveleEntrainement,
            organisateur: req.userId
        });
        await entrainement.save();
        res.status(200).json({message: "Entrainement créé"});
    } catch (err) {
        res.status(500).json({message: "Une erreur s'est produite lors de la création de l'entrainement"});
        console.log(err);
    }
});

module.exports = {entrainementRouter: router};