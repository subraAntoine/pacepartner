const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({
    content: {type: String, required: true},
    entrainement: {type: mongoose.Schema.Types.ObjectId, ref: 'entrainements', required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    date: {type: Date, default: Date.now},
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
});


const CommentaireModel = mongoose.model('commentaires', CommentaireSchema);

module.exports = {CommentaireModel};