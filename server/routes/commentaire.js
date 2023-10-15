const express = require('express');
const { EntrainementModel } = require('../models/Entrainement');
const { CommentaireModel } = require('../models/Commentaire');
const { UserModel } = require('../models/User');
const authToken = require('../middlewares/authToken');

const router = express.Router();



module.exports ={commentaireRouter: router};