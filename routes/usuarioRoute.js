const express = require('express');
const api = express.Router();

const usuarioController = require('../controllers/usuarioController');

api.post('/', usuarioController.createUsuario);
api.get('/', usuarioController.getUsuario);
api.get('/search/:id', usuarioController.getSpecific);
api.put('/update/:id', usuarioController.updateUsuario);
api.get('/admin/', usuarioController.getCurrentAdmin);
api.get('/conserje/', usuarioController.getAllConserjes);

module.exports = api;