const Usuario = require('../models/Usuario')

// CREACION DE NUEVO USUARIO
const createUsuario = async (req, res) => {
  	const { rut, nombre, domicilio, email, numero, tipoUsuario, estadoUsuario} = req.body;	  
	const newUsuario = new Usuario({
		rut,
		nombre,
		domicilio,
		email, 
        numero,
        tipoUsuario,
        estadoUsuario
	});

	newUsuario.save((err, usuario) => {
		if (err){	
			return res.status(400).send({ message: "Error al guardar" })
		}

		res.status(200).send(usuario)
	})

}

// OBTENER LISTA DE USUARIOS
const getUsuario = (req, res) => {

	Usuario.find({}, (err, usuarios) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(usuarios);
	})
}

// OBTENER UN USUARIO ESPECIFICO
const getSpecific = (req, res) => {
    let id = req.params.id
    Usuario.findById(id, (err, usuarios) => {
        if (err) {
            res.status(400).send({ message: err })
        }
        res.status(200).send(usuarios);
    })
}

// MODIFICAR EL ESTADO LABORAL DE UN USUARIO
const updateUsuario = (req, res) => {
    let id = req.params.id
    Usuario.findByIdAndUpdate(id, req.body, (err, usuario) => {
		if (err) return res.status(400).send({ message: "Error al modificar usuario" })
		res.send(usuario)
	})
}

// OBTENER EL ADMIN ACTUALMENTE CONTRATADO

const getCurrentAdmin = (req, res) => {
    
	Usuario.find({tipoUsuario: 0},{estadoUsuario:0}, (err, usuarios) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(usuarios);
	})
}

// OBTENER TODOS LOS CONSERJES

const getAllConserjes = (req, res) => {
    
	Usuario.find({tipoUsuario: 1},{estadoUsuario:0}, (err, usuarios) => {
		if (err) {
			res.status(400).send({ message: "Error al listar" })
		}
		res.status(200).send(usuarios);
	})
}


module.exports = {
  createUsuario,
  getUsuario,
  getSpecific,
  updateUsuario,
  getCurrentAdmin,
  getAllConserjes
}