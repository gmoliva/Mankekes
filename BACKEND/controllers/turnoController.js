const Turno = require('../models/Turno');
const mailer = require('../controllers/mailerController');

const createTurno = (req, res) => {
	
	const {
		tipo,
		idUsuario
	} = req.body

	let fecha = new Date();

	const newTurno = new Turno({
		fecha,
		tipo,
		idUsuario

	})

	newTurno.save((err, turno) => {
		if (err) return res.status(400).send({
			message: err
		})
		res.status(200).send(turno)
	})

}

const getTurnos = (req, res) => {

	Turno.find({}, (err, turno) => {
		if (err) return res.status(400).send({
			message: err
		})
		res.send(turno)
	})

}

const getTurno = (req, res) => {
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

const updateTurno = (req, res) => {
	let id = req.params.id
	Turno.findByIdAndUpdate(id, req.body, (err, turno) => {
		if (err) return res.status(400).send({
			message: "Error al modificar turno"
		})
		res.send(turno)
	})
}

const deleteTurno = (req, res) => {
	let id = req.params.id
	Turno.findByIdAndDelete(id, (err, result) => {
		if (err) return res.status(400).send({ message: err })
		res.status(200).send(result)
	})


}


const setEntradaSalida = async (req, res) => {
	let id = req.params.id
	let datetime = new Date();

	if (req.body.entrada) req.body.entrada = datetime;
	if (req.body.salida) req.body.salida = datetime;


	Turno.findById(id)
		.select('email')
		.populate('idUsuario')
		.exec((err, result) => {

			mailer.sendEmail(req, result.idUsuario.email)

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
	getTurnos,
	getTurno,
	updateTurno,
	deleteTurno,
	setEntradaSalida
}