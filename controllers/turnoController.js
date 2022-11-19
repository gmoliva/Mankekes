const Turno = require('../models/Turno');
const mailer = require('../controllers/mailerController');

const createTurno = (req, res) => {
	const {
		fecha,
		tipo,
		idUsuario,
		entrada,
		salida
	} = req.body
	const newTurno = new Turno({
		fecha,
		tipo,
		idUsuario,
		entrada,
		salida
	})

	newTurno.save((err, turno) => {
		if (err) return res.status(400).send({
			message: err
		})
		res.status(200).send(turno)
	})

}

const getTurno = (req, res) => {

	Turno.find({}, (err, turno) => {
		if (err) return res.status(400).send({
			message: err
		})
		res.send(turno)
	})

}

const updateTurno = (req, res) => {
	let id = req.params.id
	Turno.findByIdAndUpdate(id, req.body, (err, turno) => {
		if (err) return res.status(400).send({
			message: "Error al modificar turno"
		})
		res.send(turno)
	})
}


const getSpecific = (req, res) => {
	let id = req.params.id;
	Turno.findById(id, (err, turno) => {
		if (err) {
			res.status(400).send({
				message: err
			})
		}
		res.status(200).send(turno);
	})
}


const setEntrada = async (req, res) => {
	let id = req.params.id

	Turno.findById(id)
		.select('email')
		.populate('idUsuario')
		.exec((err, result) => {
			if (err) return handleError(err);

			console.log(result.idUsuario.email)
			mailer.sendEmail(result.idUsuario.email)
			Turno.findByIdAndUpdate(id, req.body, (err, turno) => {
				if (err) return res.status(400).send({
					"error": err
				})
				res.status(201).send(turno)
			})
		})

}


module.exports = {
	createTurno,
	getTurno,
	updateTurno,
	getSpecific,
	setEntrada
}