const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validator = require("validator")

const intern = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length==0) return res.status(400).send({ status: false, msg: "Request body can't be empty" })

        let { name, mobile, email, collegeName } = data

        if (!name) return res.status(400).send({ status: false, msg: "Enter the name first!!!" })
        if(!validator.isAlpha(name)) return res.status(400).send({ status: false, msg: "name can not be a number or special character" })

        
        if (!email) return res.status(400).send({ status: false, msg: "Enter the email Id first!!!" })
        if(!validator.isEmail(email)) return res.status(400).send({ status: false, msg: "email Id is Invalid" })
        let findEmail = await internModel.findOne({email:email})
        if(findEmail) return res.status(400).send({status:false,msg:"email Id is already exist in database"})
        
        if (!mobile) return res.status(400).send({ status: false, msg: "Enter the mobile number first!!!" })
        let findMobile = await internModel.findOne({mobile:mobile})
        if(findMobile) return res.status(400).send({status:false,msg:"mobile Number is already exist in database"})
        if(mobile.length<10||mobile.length>10) return res.status(400).send({status:false,msg:"mobile Number is not valid"})

        if (!collegeName) return res.status(400).send({ status: false, msg: "Enter the collegeName first!!!" })

        let findCollege = await collegeModel.findOne({ name: data.collegeName }).select()
        if (!findCollege) return res.status(400).send({ status: false, msg: "College Not found" })
        
        data.collegeId = findCollege._id
        let createIntern = await internModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
    } catch (error) {
        res.status(500).send({ errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { intern }