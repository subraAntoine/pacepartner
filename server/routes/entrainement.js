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

        const sport = req.query.sportEntrainement;
        const type = req.query.typeEntrainement;
        const adaptedEntrainement = req.query.adaptedEntrainement;
        console.log(adaptedEntrainement);


        const maxDistance = req.query.maxDistance * 1000;


        const user = await UserModel.findById(req.userId);

        if(!user){
            res.status(500).json({message: "Aucun utilisateur trouvé"});
        }


        const filter = {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [Long, Lat]
                },
                distanceField: "distance",
                maxDistance: maxDistance,
                spherical: true
            }
        };

        const matchConditions = [];

        if (sport !== "none") {
            matchConditions.push({ sportEntrainement: sport });
        }

        if (type !== "none") {
            matchConditions.push({ typeEntrainement: type });
        }

        // Combinez les conditions en utilisant l'opérateur $and pour exiger à la fois le sport et le type
        if (matchConditions.length > 0) {
            filter.$geoNear.query = { $and: matchConditions };
        }





        const entrainements = await EntrainementModel.aggregate([filter]);

        if(adaptedEntrainement === "true"){

            const entrainementAvecScore = await Promise.all(entrainements.map(async (entrainement) => {
                let niveauEntrainement = 0;

                // Utilisez await pour attendre la résolution de la promesse UserModel.findById
                const infoOrganisateur = await UserModel.findById(entrainement.organisateur);


                if (infoOrganisateur && user) { // Assurez-vous que les deux objets existent
                    if (infoOrganisateur.RunVolumeHebdo && user.RunVolumeHebdo) {
                        niveauEntrainement += Math.abs(infoOrganisateur.RunVolumeHebdo - user.RunVolumeHebdo) * 8;

                    }
                    if(infoOrganisateur.VMA && user.VMA){
                        niveauEntrainement += Math.abs(infoOrganisateur.VMA - user.VMA) * 10;

                    }
                    if(infoOrganisateur.record5km && user.record5km) {
                        const [h1, min1, sec1] = infoOrganisateur.record5km.split(':');
                        const [h2, min2, sec2] = user.record5km.split(':');
                        const time1 = (parseInt(h1) * 3600) + (parseInt(min1) * 60) + parseInt(sec1);
                        const time2 = (parseInt(h2) * 3600) + (parseInt(min2) * 60) + parseInt(sec2);

                        niveauEntrainement += Math.abs(time1 - time2);
                    }
                    if(infoOrganisateur.record10km && user.record10km) {
                        const [h1, min1, sec1] = infoOrganisateur.record10km.split(':');
                        const [h2, min2, sec2] = user.record10km.split(':');
                        const time1 = (parseInt(h1) * 3600) + (parseInt(min1) * 60) + parseInt(sec1);
                        const time2 = (parseInt(h2) * 3600) + (parseInt(min2) * 60) + parseInt(sec2);

                        niveauEntrainement += parseInt(Math.abs(time1 - time2)/2);
                    }
                    if(infoOrganisateur.recordSemi && user.recordSemi) {
                        const [h1, min1, sec1] = infoOrganisateur.recordSemi.split(':');
                        const [h2, min2, sec2] = user.recordSemi.split(':');
                        const time1 = (parseInt(h1) * 3600) + (parseInt(min1) * 60) + parseInt(sec1);
                        const time2 = (parseInt(h2) * 3600) + (parseInt(min2) * 60) + parseInt(sec2);

                        niveauEntrainement += parseInt(Math.abs(time1 - time2)/3);
                    }
                    if(infoOrganisateur.recordMarathon && user.recordMarathon) {
                        const [h1, min1, sec1] = infoOrganisateur.recordMarathon.split(':');
                        const [h2, min2, sec2] = user.recordMarathon.split(':');
                        const time1 = (parseInt(h1) * 3600) + (parseInt(min1) * 60) + parseInt(sec1);
                        const time2 = (parseInt(h2) * 3600) + (parseInt(min2) * 60) + parseInt(sec2);

                        niveauEntrainement += parseInt(Math.abs(time1 - time2) / 4);
                    }


                    entrainement.niveau = niveauEntrainement;

                    return entrainement;
                }
            }));


            entrainementAvecScore.sort((a, b) => {
                return a.niveau - b.niveau;
            });

            return res.status(200).json({entrainements: entrainementAvecScore});


        }

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
        const user = await UserModel.findById(userID);
        const entrainement = await EntrainementModel.findById(entrainementID);
        if (entrainement.participants.length < entrainement.nbMaxParticipants) {
            entrainement.participants.push(userID);
            user.trainingJoined.push(entrainementID);
            await user.save();
            await entrainement.save();
            res.status(200).json({message: "Vous avez rejoint l'entrainement !"});
        } else {
            res.status(500).json({message: "L'entrainement est complet !"});
        }
    } catch (error) {
        res.status(500).json({message: "Erreur lors de l'ajout de l'utilisateur à l'entrainement", error: error});
    }
});

router.post('/addFavorite/:entrainementID', authToken, async (req, res) => {
    try{
        const entrainementId = req.params.entrainementID;
        const userID = req.userId;
        const user = await UserModel.findById(userID);
        const entrainement = await EntrainementModel.findById(entrainementId);
        if(entrainement && !user.favoriteTrainings.includes(entrainementId)){
            user.favoriteTrainings.push(entrainementId);
            await user.save();
            res.status(200).json({message: "L'entrainement a bien été ajouté aux favoris !"});
        } else {
            res.status(500).json({message: "L'entrainement est déjà dans les favoris !"});
        }

    } catch (err) {
        res.status(500).json({message: "Erreur lors de l'ajout de l'entrainement aux favoris", error: err});
    }
})

router.post('/removeFavorite/:entrainementID', authToken, async (req, res) => {
    try {
        const entraimentID = req.params.entrainementID;
        const userID = req.userId;
        const user = await UserModel.findById(userID);
        const entrainement = await EntrainementModel.findById(entraimentID);
        if(entrainement){
            const index = user.favoriteTrainings.indexOf(entraimentID);
            if(index > -1){
                user.favoriteTrainings.splice(index, 1);
                await user.save();
                res.status(200).json({message: "L'entrainement a bien été supprimé des favoris !"});
            } else {
                res.status(500).json({message: "L'entrainement n'est pas dans les favoris !"});
            }
        } else {
            res.status(500).json({message: "L'entrainement n'existe pas !"});

        }

    } catch (err) {
        res.status(500).json({message: "Erreur lors de la suppression de l'entrainement des favoris", error: err});
    }

})


router.post('/leaveEntrainement/:entrainementID', authToken, async (req, res) => {
    try{
        const entrainementID = req.params.entrainementID;
        const entrainement = await EntrainementModel.findById(entrainementID);
        const userID = req.userId;
        const user = await UserModel.findById(userID);
        const index = entrainement.participants.indexOf(userID);
        if (index > -1) {
            entrainement.participants.splice(index, 1);
            await entrainement.save();
            const index2 = user.trainingJoined.indexOf(entrainementID);
            user.trainingJoined.splice(index2, 1);
            await user.save();
            res.status(200).json({message: "Vous avez quitté l'entrainement !"});
        } else {
            res.status(500).json({message: "Vous n'êtes pas inscrit à cet entrainement !"});
        }
    }catch (err){
        console.log(err);
    }
});


module.exports = {entrainementRouter: router};