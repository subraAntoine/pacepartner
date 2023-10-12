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

router.post('/delete/:entrainementID', authToken, async (req, res) => {
    try{
        const idEntrainement = req.params.entrainementID;
        const entrainement = await EntrainementModel.findById(idEntrainement);
        if(!entrainement){
            res.status(500).json({message: "Aucun entrainement trouvé"});
        }
        if(entrainement.organisateur.toString() !== req.userId){
            res.status(500).json({message: "Vous n'êtes pas l'organisateur de cet entrainement"});
        }else{
            const deletedEntrainement = await EntrainementModel.findByIdAndDelete(idEntrainement);
            if(!deletedEntrainement){
                res.status(500).json({message: "Erreur lors de la suppression de l'entrainement"});
            }

            res.status(200).json({message: "Entrainement supprimé avec succès !"});
        }

    } catch (err){
        res.status(500).json({message: "Erreur lors de la suppression de l'entrainement", error: err});
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

router.get('/allMatch', authToken, async (req, res) => {
    try {
        const userLat = 45.597108;
        const userLong = 5.27212;

        const Lat = parseFloat(userLat);
        const Long = parseFloat(userLong);


        const maxDistance = 5000;
        const user = await UserModel.findById(req.userId);

        if(!user){
            res.status(500).json({message: "Aucun utilisateur trouvé"});
        }

        const entrainements = await EntrainementModel.aggregate([{
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [Long, Lat]
                },
                distanceField: "distance",
                maxDistance: maxDistance,
                spherical: true
            }
        }]);

        console.log(entrainements);

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

router.post('/leaveEntrainement/:entrainementID', authToken, async (req, res) => {
    try{
        const entrainementID = req.params.entrainementID;
        const entrainement = await EntrainementModel.findById(entrainementID);
        const userID = req.userId;
        const index = entrainement.participants.indexOf(userID);
        if (index > -1) {
            entrainement.participants.splice(index, 1);
            await entrainement.save();
            res.status(200).json({message: "Vous avez quitté l'entrainement !"});
        } else {
            res.status(500).json({message: "Vous n'êtes pas inscrit à cet entrainement !"});
        }
    }catch (err){
        console.log(err);
    }
});


module.exports = {entrainementRouter: router};