require('dotenv').config()

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const myconnection = require('express-myconnection');
const mysql = require('mysql')
const body_parser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();
const port = 3000;
const userRoutes = require('./routes/user')

app.use(cors())

app.set(port, process.env.PORT || 8080)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('dev'))
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'blog'
}, 'single'))

app.use(body_parser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/', userRoutes)

console.log(process.env.SECRETPRIVATEKEY)

app.listen(port || 3000, () => {
    console.log(`The port is ${port}`)
})