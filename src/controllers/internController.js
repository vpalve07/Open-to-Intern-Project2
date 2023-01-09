const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validator = require("validator")

const intern = async function (req, res) {
    try {
        let data = req.body
        let findCollege = await collegeModel.findOne({ name: data.collegeName }).select()
        let { name, mobile, email, collegeName } = data

        if (!name) return res.status(400).send({ status: false, msg: "name is mandatory" })
        if(!validator.isAlpha(name)) return res.status(400).send({ status: false, msg: "name should be in letters" })

        if (!mobile) return res.status(400).send({ status: false, msg: "mobile is mandatory" })
        let findMobile = await internModel.findOne({mobile:mobile})
        if(findMobile) return res.status(403).send({status:false,msg:"mobile Number is already exist"})
        if(mobile.length<10||mobile.length>10) return res.status(403).send({status:false,msg:"mobile Number format is not valid"})

        if (!email) return res.status(400).send({ status: false, msg: "email is mandatory" })
        if(!validator.isEmail(email)) return res.status(400).send({ status: false, msg: "email is Invalid" })
        let findEmail = await internModel.findOne({email:email})
        if(findEmail) return res.status(403).send({status:false,msg:"Email Id is already exist"})

        if (!collegeName) return res.status(400).send({ status: false, msg: "collegeName is mandatory" })
        if (!findCollege) return res.status(400).send({ status: false, msg: "College Not found" })
        data.collegeId = findCollege._id
        if (!data) return res.status(400).send({ status: false, msg: "Request body can't be empty" })
        let createIntern = await internModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
    } catch (error) {
        res.status(500).send({ errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { intern }