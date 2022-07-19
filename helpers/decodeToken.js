const jwt = require('jsonwebtoken')
const { promisify } = require('util')
require('dotenv').config()

const decodeToken =  ((req, res) => {
        const token = req.cookies.jwt
        const decodeData = promisify(jwt.verify)(token, process.env.SECRETPRIVATEKEY)
        console.log('Decodificación: ', decodeData)
        return decodeData
})

module.exports = decodeToken



