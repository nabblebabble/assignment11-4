const express = require('express');
const mongodb = require('mongodb');
const bcryptjs = require('bcryptjs');

//mongoose 
const UserSchema = require('../../../models/User.js');
//const User = require('../../../models/User.js');


const router = express.Router();

//GET ALL
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});


//NEW ADD ONE //this works
// router.post('/', async (req, res) => {
//     const users = await loadUsersCollection();
//     const newUser = new UserSchema({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     await users.insertOne({
//         name: newUser.name,
//         email: newUser.email,
//         password: newUser.password
//     });
//     res.status(201).send();
// });

//new new with auth
// router.post('/', async (req, res) => {
//     //const users = await loadUsersCollection();
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const newUser = new User({
//         name,
//         email,
//         password
//     });
//     User.createUser(newUser, (error, user) => {
//         if (error) {console.log(error); }
//         res.send({ user });
//     });
// });

//NEW new with salt
router.post('/', async (req, res) => {
    const users = await loadUsersCollection();
    const newUser = new UserSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(req.body.password, salt, (error, hash) => {
            users.insertOne({
                name: newUser.name,
                email: newUser.email,
                password: hash
            });
        });
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

async function saltThis(pass) {
    return pass;
}

module.exports = router;