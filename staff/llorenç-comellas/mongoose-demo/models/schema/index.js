const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String
})

const adminSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String
})

module.exports = {
    usersSchema,
    adminSchema
}    