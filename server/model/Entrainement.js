const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const EntrainementSchema = new mongoose.Schema({
    dateEntrainement: {type: Date, required: true},
    heureEntrainement: {type: String, required: true},
    typeEntrainement: {type: String, required: true},
    lieuEntrainement: {type: String, required: true},
    descriptionEntrainement: {type: String, required: true},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    organisateur: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    nbParticipants: {type: Number, default: 0},
    nbMaxParticipants: {type: Number, required: true},
    isPrivate: {type: Boolean, default: false},
    isCancelled: {type: Boolean, default: false},
    isFinished: {type: Boolean, default: false},
    isFull: {type: Boolean, default: false},
    sportEntrainement: {type: String, required: true},
    distanceEntrainement: {type: Number, required: true},
    dureeEntrainement: {type: Number, required: true},
    gpsLocation: pointSchema
});

const EntrainementModel = mongoose.model('entrainements', EntrainementSchema);

module.exports = {EntrainementModel};