const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/turan_project')
        app.listen(PORT, () => console.log(`server start on ${PORT} port`))
    }   catch(e) {
        console.log(e)
    }
}

start()