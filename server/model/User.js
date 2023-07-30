const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pseudo: {type: String, required: true, unique: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    sports: [{type: String, required: true}],
    niveau: {type: String},
    localisation: {type: String},
    description: {type: String},
    photo: {type: String},
    dateNaissance: {type: Date},
    isSubscribed: {type: Boolean, default: false},
    subscriptionPlan: {type: String},
    subscriptionId: {type: String},

});

const UserModel = mongoose.model('users', UserSchema);

module.exports = {UserModel};