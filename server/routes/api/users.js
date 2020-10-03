const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//GET ALL
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});

//ADD ONE
router.post('/', async (req, res) => {
    const users = await loadUsersCollection();
    await users.insertOne({
        name: req.body.name,
        createdAt: new Date()
    });
    res.status(201).send();
});

//DELETE ONE
router.delete('/:id', async (req, res) => {
    const users = await loadUsersCollection();
    await users.deleteOne({_id: new mongodb.ObjectID( req.params.id)});
    res.status(200).send();
});

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://dbplanetabc123:dbplanetpass123@cluster0.ddv7n.mongodb.net/users?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return client.db('GoodWorldPlanets').collection('users');
}

module.exports = router;