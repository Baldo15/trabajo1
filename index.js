const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trabajo1.a', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error(err));

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: String,
  edad: Number,
});

const MiModelo = mongoose.model('MiModelo', schema);

module.exports = MiModelo;

const express = require('express');
const bodyParser = require('body-parser');
const MiModelo = require('./mi-modelo');

const app = express();
app.use(bodyParser.json());

// Ruta para obtener todos los documentos en la colección
app.get('/documentos', async (req, res) => {
  const documentos = await MiModelo.find();
  res.json(documentos);
});

// Ruta para obtener documentos que cumplen una condición
app.get('/documentos/:campo/:valor', async (req, res) => {
  const campo = req.params.campo;
  const valor = req.params.valor;
  const query = {};
  query[campo] = valor;
  const documentos = await MiModelo.find(query);
  res.json(documentos);
});

// Ruta para modificar un documento
app.put('/documentos/:campo/:valor', async (req, res) => {
  const campo = req.params.campo;
  const valor = req.params.valor;
  const query = {};
  query[campo] = valor;
  const documento = await MiModelo.findOne(query);
  if (!documento) {
    const nuevoDocumento = new MiModelo(req.body);
    await nuevoDocumento.save();
    res.status(201).json(nuevoDocumento);
  } else {
    await documento.updateOne(req.body);
    res.json(documento);
  }
});

// Ruta para eliminar documentos que cumplen una condición
app.delete('/documentos/:campo/:valor', async (req, res) => {
  const campo = req.params.campo;
  const valor = req.params.valor;
  const query = {};
  query[campo] = valor;
  const resultado = await MiModelo.deleteMany(query);
  if (resultado.deletedCount === 0) {
    res.status(204).end();
  } else {
    res.json({ mensaje: `${resultado.deletedCount} documento(s) eliminado(s)` });
  }
});

app.listen(3000, () => console.log('Servidor iniciado en http://localhost:3000'));
