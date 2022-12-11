const express = require('express');
const api = express.Router();

const novedadController = require('../controllers/novedadController');

api.post('/', novedadController.createNovedad);
api.get('/', novedadController.getNovedades);
api.get('/:id', novedadController.getNovedad);
api.put('/:id', novedadController.updateNovedad);
api.delete('/:id', novedadController.deleteNovedad);

module.exports = api;