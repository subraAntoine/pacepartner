const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pseudo: {type: String, required: true, unique: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    sports: [{type: String, required: true}],
    localisation: {type: String},
    description: {type: String},
    photo: {type: String},
    dateNaissance: {type: Date},
    isSubscribed: {type: Boolean, default: false},
    subscriptionPlan: {type: String},
    subscriptionId: {type: String},
    notifications: [{type: mongoose.Schema.Types.ObjectId, ref: 'notifications'}],
    record5km: {type: String},
    record10km: {type: String},
    recordSemi: {type: String},
    recordMarathon: {type: String},
    longestRun: {type: Number},
    longestBike: {type: Number},
    VMA: {type: Number},
    FTP: {type: Number},
    RunVolumeHebdo: {type: Number},
    BikeVolumeHebdo: {type: Number},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    friendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    friendRequestsSent: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    trainingJoined: [{type: mongoose.Schema.Types.ObjectId, ref: 'entrainements'}],
    favoriteTrainings: [{type: mongoose.Schema.Types.ObjectId, ref: 'entrainements'}],
    createdTrainings: [{type: mongoose.Schema.Types.ObjectId, ref: 'entrainements'}],
    verified: {type: Boolean, default: false},
    emailToken: {type: String},
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = {UserModel};