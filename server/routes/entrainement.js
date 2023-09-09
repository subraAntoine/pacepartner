const express = require('express');
const {EntrainementModel} = require('../model/Entrainement');
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

module.exports = {entrainementRouter: router};