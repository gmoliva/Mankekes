const Novedad = require('../models/Novedad')

const createNovedad = (req, res) => {
	const { asunto, descripcion, idTurno } = req.body
	const newNovedad = new Novedad({
		asunto,
		descripcion,
		idTurno

	})

	newNovedad.save((err, especialista) => {
		if (err) return res.status(400).send({ message: "error guardando" })
		res.status(200).send(especialista)
	})
}

const getNovedades = (req, res) => {
	Novedad.find({}, (err, novedades) => {
		if (err) return res.status(400).send({ message: "error listando" })
		res.send(novedades)
	})
}

module.exports = {
	createNovedad,
	getNovedades
}