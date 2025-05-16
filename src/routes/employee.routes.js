const express = require('express')
const router = express.Router()
const employees = require("../controller/employee.controller.js")

router.post("/", employees.create)
router.get("/", employees.findAll)
router.get("/:id", employees.findOne)
router.put("/:id", employees.update)
router.delete("/:id", employees.delete)
router.delete("/", employees.deleteAll)

module.exports = router