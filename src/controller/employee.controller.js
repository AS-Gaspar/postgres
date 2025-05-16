const db = require("../models")
const Employee = db.Employee
const Build = db.Build 

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Employee name can not be empty!",
    })
    return
  }

  const employee = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    buildId: req.body.buildId, 
  }

  try {
    if (employee.buildId) {
      const build = await Build.findByPk(employee.buildId)
      if (!build) {
        res.status(404).send({
          message: `Cannot create Employee. Build with id=${employee.buildId} not found.`,
        })
        return
      }
    }

    const data = await Employee.create(employee)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Employee.",
    })
  }
}

exports.findAll = async (req, res) => {
  const buildId = req.query.buildId 
  var condition = buildId ? { buildId: buildId } : null

  try {
    const data = await Employee.findAll({ where: condition, include: ["build"] }) // Include build details
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving employees.",
    })
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Employee.findByPk(id, { include: ["build"] }) 
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({
        message: `Cannot find Employee with id=${id}.`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Employee with id=" + id,
    })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  try {
    if (req.body.buildId) {
        const build = await Build.findByPk(req.body.buildId);
        if (!build) {
            res.status(404).send({
                message: `Cannot update Employee. Build with id=${req.body.buildId} not found.`
            });
            return;
        }
    }

    const num = await Employee.update(req.body, {
      where: { id: id },
    })

    if (num == 1) {
      res.send({
        message: "Employee was updated successfully.",
      })
    } else {
      res.send({
        message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    const num = await Employee.destroy({
      where: { id: id },
    })

    if (num == 1) {
      res.send({
        message: "Employee was deleted successfully!",
      })
    } else {
      res.send({
        message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Employee with id=" + id,
    })
  }
}

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Employee.destroy({
      where: {},
      truncate: false,
    })
    res.send({ message: `${nums} Employees were deleted successfully!` })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all employees.",
    })
  }
}