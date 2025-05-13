const { Sequelize } = require('sequelize')
const sequelize = require('../config/db.config')
const Build = require('./Build')
const Employee = require('./Employee')

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Build = Build
db.Employee = Employee

db.sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables synced!')
    })
    .catch(err => {
        console.error('Unable to sync database & tables:', err)
    })

module.exports = db