const express = require('express');
const { EntrainementModel } = require('../model/Entrainement');
const { CommentaireModel } = require('../model/Commentaire');
const { UserModel } = require('../model/User');
const authToken = require('../middlewares/authToken');

const router = express.Router();

router.post('/addCommentaire', authToken, async (req, res) => {
    try{
        const entrainement = req.body.entrainementID;
        const content = req.body.contenuCommentaire;
        const author = req.userId;

        const verifEntrainement = await EntrainementModel.findById(entrainement);

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

router.post('/deleteComment/:commentaireID', authToken, async (req,res) => {
    try{
        const commentID = req.params.commentaireID;
        const comment = await CommentaireModel.findById(commentID)
        const userId = req.userId;
        if(comment.author.toString() === userId){
            const deletedEntrainement = await CommentaireModel.findByIdAndDelete(commentID);
            res.status(200).json({message: "Commentaire supprimé avec succès."})
        }else{
            return res.status(500).json({message: "Vous n'êtes pas l'auteur de ce commentaire."})
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/getComments/:entrainementID', authToken, async (req, res) => {
    try{
        const entrainementId = req.params.entrainementID
        const entrainement = await EntrainementModel.findById(entrainementId);

        if(entrainement){
            const comments = await CommentaireModel.find({entrainement: entrainementId})
            res.status(200).json({data: comments})

        }else{
            res.status(500).json({message: "L'entrainement n'existe pas."})
        }

    } catch (err) {

    }
})




module.exports ={commentaireRouter: router};