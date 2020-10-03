const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET ALL
router.get('/', async (req, res) => {
    const planets = await loadPlanetsCollection();
    res.send(await planets.find({}).toArray());
});

//ADD ONE
router.post('/', async (req, res) => {
    const planets = await loadPlanetsCollection();
    await planets.insertOne({
        name: req.body.name,
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