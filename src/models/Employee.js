const { DataTypes } = require('sequelize')
const sequelize = require('../config/db.config')
const Project = require('./Project')

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admissionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'id'
        }
    }
})