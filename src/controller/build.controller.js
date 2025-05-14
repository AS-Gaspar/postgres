const db = require("../models")
const Build = db.Build

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Build name can not be empty!",
    })
    return
  }

  const build = {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.endDate,
    status: req.body.status,
  }

  try {
    const data = await Build.create(build)
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some eror ocurred while creating the Build.",
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const data = await Build.findAll()
    res.send(data)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error ocurred while retrievind builds.",
    })
  }
}

exports.findOne = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Build.findByPk(id, { include: ["employees"] })
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({
        message: `Cannot find Build with id = ${id}`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Build with id = ${id}`,
    })
  }
}

exports.update = async (req, res) => {
  const id = req.params.id

  try {
    const num = await Build.update(req.body, {
      where: { id: id },
    })
    if (num == 1) {
      res.send({
        message: "Build was updated sucessfully",
      })
    } else {
      res.send({
        message: `Cannot update Build with id = ${id}`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating Build with id = ${id}`,
    })
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    const num = await Build.destroy({
      where: { id: id },
    })
    if (num == 1) {
      res.send({
        message: "Build was deleted successfully!",
      })
    } else {
      res.send({
        message: `Cannot delete Build with id = ${id}. Maybe Build was not found!`,
      })
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || `Some error occurred while removing all builds`,
    })
  }
}

exports.deleteAll = async (req, res) => {
  try {
    const nums = await Project.destroy({
      where: {},
      truncate: false // set to true if you want to TRUNCATE the table
    });
    res.send({ message: `${nums} Projects were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all projects."
    });
  }
};
