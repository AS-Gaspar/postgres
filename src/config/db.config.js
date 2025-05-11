const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('empreiteira_lk', 'gaspar', '0405', {
    host: 'localhost',
    dialect: 'postgres',
})

module.exports = sequelize