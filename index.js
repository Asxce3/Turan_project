const express = require('express')
const mongoose = require('mongoose')
const Role = require('./models/Role')
const authRouter = require('./routers/authRouter')
const qrRouter = require('./routers/qrRouter')
const bonusRoutee = require('./routers/bonusRouter')
const userDataRouter = require('./routers/userDataRouter')
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
    res.header('Access-Control-Allow-Credentials', 'true')
    next();
  });
app.use('/auth', authRouter)
app.use('/user', userDataRouter)
app.use('/api', qrRouter)
app.use('/bonus', bonusRoutee)
app.get('/', async (req, res) => {
    // const staffRole = new Role({value : 'RESTAURANT'})
    // await staffRole.save()
    res.cookie('myCookie', 'hello')
    res.json({message:'ok'})
})
app.get('/get-cookie', (req, res) => {
    console.log('Cookie: ', req.cookies);
    res.send('Get Cookie');
});

app.get('/set-cookie', (req, res) => {
    res.cookie('myCookie', 'hello');
    res.send('Set Cookie');
});



const start = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/turan_project')
        app.listen(PORT, () => console.log(`server start on ${PORT} port`))
    }   catch(e) {
        console.log(e)
    }
}

start()