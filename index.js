require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const turnoRoute = require('./routes/turnoRoute')
const novedadRoute = require('./routes/novedadRoute')
const usuarioRoute = require('./routes/usuarioRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api/Turno', turnoRoute)
app.use('/api/Novedad', novedadRoute)
app.use('/api/Usuario', usuarioRoute)


app.listen(PORT, () => {
  console.log("Server running on PORT " + PORT)
})

mongoose.connect(`mongodb://localhost:27017/`, (error) => {
  if(error) console.log(error)
  else {
    console.log("Connected to database")}
})

