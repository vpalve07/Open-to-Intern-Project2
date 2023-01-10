const express = require('express')
const route = require('../src/routes/route')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://internshipGroup12:internshipGroup12@internshipgroup12.rn0supg.mongodb.net/group12Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err))

app.use("/", route)

app.listen(3000, function () {
    console.log("Express app running on port 3000")
})