const express = require('express');
const mongodb = require('mongodb');

//mongoose
const PlanetSchema = require('../../../models/Planet');

const router = express.Router();

//GET ALL
router.get('/', async (req, res) => {
    const planets = await loadPlanetsCollection();
    res.send(await planets.find({}).toArray());
});

//ADD ONE
router.post('/', async (req, res) => {
    const planets = await loadPlanetsCollection();
    const newPlanet = new PlanetSchema({
        name: req.body.name,
        question: req.body.question,
        answer: req.body.answer,
        bool: req.body.bool
    });
    await planets.insertOne({
        name: newPlanet.name,
        emotion: req.body.emotion,
        imgUrl: 'emotion' + req.body.emotion + '.jpg',
        popularity: 0,
        question: newPlanet.question,
        answer: newPlanet.answer,
        bool: newPlanet.bool,
        leadObject: '',
        galaxy: 1,
        createdAt: new Date()
    });
    res.status(201).send();
});

//DELETE ONE
router.delete('/:id', async (req, res) => {
    const planets = await loadPlanetsCollection();
    await planets.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPlanetsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbplanetabc123:dbplanetpass123@cluster0.ddv7n.mongodb.net/planets?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('GoodWorldPlanets').collection('planets');
}

module.exports = router;