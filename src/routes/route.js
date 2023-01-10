const express = require('express')
const { college, getCollege } = require('../controllers/collegeController')
const { intern } = require('../controllers/internController')
const router = express.Router()

router.get('/test-me', function (req, res) {
    res.send({ msg: "Testing API" })
})

router.post('/functionup/colleges', college)
router.post('/functionup/interns', intern)
router.get('/functionup/collegeDetails', getCollege)
router.all("/*", function (req, res) { res.status(404).send({ status: false, msg: "Invalid HTTP request" }) })

module.exports = router