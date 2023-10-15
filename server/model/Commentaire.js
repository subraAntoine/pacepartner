const mongoose = require('mongoose');

const CommentaireSchema = new mongoose.Schema({
    content: {type: String, required: true},
    entrainement: {type: mongoose.Schema.Types.ObjectId, ref: 'entrainements'},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    date: {type: Date, default: Date.now},
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
});

const CommentaireModel = mongoose.model('commentaires', CommentaireSchema);

module.exports = {CommentaireModel};