const express = require('express');
const api = express.Router();

const usuarioController = require('../controllers/usuarioController');

api.post('/:typeUser', usuarioController.createUsuario);
api.get('/', usuarioController.getUsuarios);
api.get('/search/:id', usuarioController.getUsuario);
api.delete('/:id/:typeUser', usuarioController.deleteUsuario);
api.put('/update/:id/:typeUser', usuarioController.updateUsuario);
api.get('/admin/', usuarioController.getCurrentAdmin);
api.get('/conserje/', usuarioController.getAllConserjes);

module.exports = api;