const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("validator")


const college = async function (req, res) {
    try {
        let data = req.body
        if (!data) return res.status(400).send({ status: false, msg: "Request body can't be empty" })
        let { name, fullName, logoLink, isDeleted } = data
        if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" })
        if(!validator.isAlpha(name)) return res.status(400).send({ status: false, msg: "name should be in Alphabet" })

        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is mandatory" })
        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink is mandatory" })
        let createCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: createCollege })
    } catch (error) {
        res.status(500).send({ errorType: error.name, errorMsg: error.message })
    }
}

const getCollege = async function (req, res) {
    try {
        let queryParam = req.query
        if(Object.keys(queryParam).length==0) return res.status(400).send({ status: false, msg: "query Params are mandatory" })
        let findCollege = await collegeModel.findOne({ name: queryParam.collegeName }).select({ _id: 1 })
        let internCollege = await internModel.find({ collegeId: findCollege._id })
        res.status(200).send({ status: true, data: internCollege })
    } catch (error) {
        res.status(500).send({ errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { college, getCollege }