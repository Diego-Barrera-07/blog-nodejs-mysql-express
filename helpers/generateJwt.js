const jwt = require('jsonwebtoken')
require('dotenv').config()


const generatorJWT = (data) => {
    const payload = { data }

    const token = jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
        expiresIn: '12H'
    })

    return (token)
}

module.exports = generatorJWT 