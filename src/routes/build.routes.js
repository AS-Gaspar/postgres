const builds = require('../controller/build.controller.js')
const router = require('express').Router()

router.post("/", builds.create)
router.get("/", builds.findAll)
router.get("/:id", builds.findOne)
router.put("/:id", builds.update)
router.delete("/:id", builds.delete)
router.delete("/:id", builds.deleteAll)

module.exports = router