const express = require('express');
const { EntrainementModel } = require('../model/Entrainement');
const { CommentaireModel } = require('../model/Commentaire');
const { UserModel } = require('../model/User');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router.post('/addCommentaire', authToken, async (req, res) => {
    try{
        const entrainement = req.query.entrainementID;
        const content = req.query.contenuCommentaire;
        const author = req.userId;

        const verifEntrainement = EntrainementModel.findById(entrainement);

        if(verifEntrainement && entrainement !== null && author !== null && content !== null){
            const commentaire = new CommentaireModel({
                content,
                entrainement,
                author
            })

            await commentaire.save();

            return res.status(200).json({message: "Commentaire ajouté avec suucès."})

        } else{
            return res.status(500).json({message: "Erreur données vides."})
        }

    }catch (err){
        console.log(err);
    }
});



module.exports ={commentaireRouter: router};