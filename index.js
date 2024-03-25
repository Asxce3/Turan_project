const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const qrRouter = require('./routers/qrRouter')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use('/auth', authRouter)
app.use('/api', qrRouter)
app.get('/', (req, res) => {
    res.render('pages/index')
    // res.json({message:'ok'})
})

const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/turan_project')
        app.listen(PORT, () => console.log(`server start on ${PORT} port`))
    }   catch(e) {
        console.log(e)
    }
}

start()