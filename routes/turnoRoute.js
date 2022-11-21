const express = require('express');
const api = express.Router();

const turnoController = require('../controllers/turnoController');

api.post('/', turnoController.createTurno);
api.get('/', turnoController.getTurno);
api.get('/:id', turnoController.getSpecific);
api.put('/set/:id', turnoController.setEntradaSalida);

module.exports = api;