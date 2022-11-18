const express = require('express');
const api = express.Router();

const usuarioController = require('../controllers/usuarioController');

api.post('/', usuarioController.createUsuario);
api.get('/', usuarioController.getUsuario);
api.get('/:id', usuarioController.getSpecific);
api.put('/:id', usuarioController.updateUsuario);

module.exports = api;