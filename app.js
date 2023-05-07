const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });

app.use(bodyParser.json());

app.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.get('/documents/search', async (req, res) => {
    try {
        const documents = await Document.find(req.query);
        res.json(documents);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.put('/documents/:id', async (req, res) => {
    try {
        const document = await Document.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { upsert: true }
        );
        res.status(document ? 200 : 201).json(document);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.delete('/documents', async (req, res) => {
    try {
        const result = await Document.deleteMany(req.query);
        res.status(result.deletedCount > 0 ? 200 : 204).send();
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});

const Document = mongoose.model('Document', {
    field1: String,
    field2: String,
    field3: Number
});