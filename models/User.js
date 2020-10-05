const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema)
module.exports = User;

