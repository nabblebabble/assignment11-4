const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PlanetSchema = new Schema({
    name: String,
    question: String,
    answer: String,
    bool: Boolean
});

const Planet = mongoose.model('Planet', PlanetSchema)
module.exports = Planet;