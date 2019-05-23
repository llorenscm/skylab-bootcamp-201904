const mongoose = require('mongoose')
const {usersSchema, adminSchema} = require('./schema')

const Users = mongoose.model('Users', usersSchema)
const SuperAdmin = mongoose.model('superAdmin', adminSchema)

module.exports ={
    Users,
    SuperAdmin,
}