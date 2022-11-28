const Novedad = require('../models/Novedad')
const Turno = require('../models/Turno')
const mailer = require('../controllers/mailerController')


const createNovedad = (req, res) => {
	const { asunto, descripcion, idTurno, idUsuario } = req.body
	const newNovedad = new Novedad({
		tipo: 0,
		asunto,
		descripcion,
		idTurno,
		idUsuario
	})

	newNovedad.save((err, novedad) => {
		if (err) return res.status(400).send({ message: "error guardando" })
		res.status(200).send(novedad)
	})
}

const getNovedades = (req, res) => {
	Novedad.find({}, (err, novedades) => {
		if (err) return res.status(400).send({ message: "error listando" })
		res.send(novedades)
	})
}

const getNovedad = (req, res) => {
	let id = req.params.id
	Novedad.findById(id, (err, novedad) => {
		if (err) {
			res.status(400).send({ message: err })
		}
		res.status(200).send(novedad);
	})
}

const updateNovedad = (req, res) => {
	const { id } = req.params;
	Novedad.findByIdAndUpdate(id, req.body, (err, novedad) => {
		if (err) return res.status(400).send({ message: "Error al modificar novedad" })
		res.send(novedad)
	})
}


const deleteNovedad = (req, res) => {
	let id = req.params.id
	Novedad.findByIdAndDelete(id, (err, result) => {
		if (err) {
			res.status(400).send({ message: err })
		}
		res.status(200).send(result)
	}
	)
}

const getnovedadTurno = (req, res) => {
	let id =  req.params.id
	Novedad.find({})
	.populate ('idTurno')
	.exec ((err, result) => {
	//console.log ('Tulon 1:'+result.idTurno)
	//console.log ('Tulon 2:'+result.idTurno._id)
	if (err) {
		res.status(400).send({ message: err })
			}
			res.status(200).send(result)
	})

}

const enviarJustificacion = (req, res) => {
	let idUsuario = req.params.id
	
	const { justificacion, idTurno } = req.body
	const newNovedad = new Novedad({
		tipo: 1,
		asunto: "JUSTIFICACION INASISTENCIA",
		descripcion: justificacion,
		idTurno,
		idUsuario
	})

	req.body.idUsuario = ""

	Turno.findByIdAndUpdate(idTurno, req.body.idUsuario)//, (err, result) => {
		//if (err) console.log( {msg: err} );
		//console.log(result)
	//})
	Turno.findById(idTurno).select('email').populate('idUsuario').exec((err, user) => {
		if (err) return res.status(400).send({msg: err})
		//console.log(user.idUsuario.email)
		//mailer.sendEmail(req, user.email)
		newNovedad.save((err, novedad) => {
			if (err) return res.status(400).send({ message: err })
			mailer.sendEmail(req, user.idUsuario.email)
			res.status(200).send(novedad)
		})
	})
}

module.exports = {
	createNovedad,
	getNovedades,
	getNovedad,
	updateNovedad,
	deleteNovedad,
	getnovedadTurno,
	enviarJustificacion
}

