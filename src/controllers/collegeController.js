const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("validator")


const college = async function (req, res) {
    try {
        let data = req.body
        if (!data) return res.status(400).send({ status: false, msg: "Request body can't be empty" })
        let { name, fullName, logoLink, isDeleted } = data
        if (!name) return res.status(400).send({ status: false, msg: "Enter the name first!!!" })
        if (!validator.isAlpha(name)) return res.status(400).send({ status: false, msg: "name should be in Alphabetical format" })
        let duplicateName = await collegeModel.findOne({ name: name })                                     
        if (duplicateName) return res.status(400).send({ status: false, msg: "name is is already exist in database" })   

        if (!fullName) return res.status(400).send({ status: false, msg: "Enter the fullName first!!!" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "Enter the logoLink first!!!" })
        let logoLinkFormat = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/  
        if (!logoLinkFormat.test(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is Invalid" })  

        let createCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: createCollege })
    } catch (error) {
        res.status(500).send({ errorType: error.name, errorMsg: error.message })
    }
}

const getCollege = async function (req, res) {
    try {
        let queryParam = req.query
        if (Object.keys(queryParam).length == 0) return res.status(400).send({ status: false, msg: "Give the data first for fetching document!!!" })
        // let {name,fullName} = queryParam
        // let lower = queryParam.collegeName.toLowerCase()
        let findCollege = await collegeModel.findOne({ $or: [{ name: queryParam.collegeName }, { fullName: queryParam.fullName }, { _id: queryParam.collegeId }] })
        if (!findCollege) return res.status(400).send({ status: false, msg: "Don't Have any college with this data in database" })
        let { name, fullName, logoLink } = findCollege
        let internCollege = await internModel.find({ collegeId: findCollege._id }).select({ name: 1, email: 1, mobile: 1 })
        if (internCollege.length == 0) return res.status(400).send({ status: false, msg: "No Interns Found." })
        res.status(200).send({ status: true, data: { name, fullName, logoLink, interns: internCollege } })
    } catch (error) {
        res.status(500).send({ errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { college, getCollege }