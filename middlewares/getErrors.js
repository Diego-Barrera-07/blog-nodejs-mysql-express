const { validationResult } = require('express-validator')

const validatorData = (req, res, next) => {
    const dataGet = req.body
    console.log('Recibico: ', dataGet)
    const errors = validationResult(req)
    let getErrors = errors.array()
    if (getErrors == []) {
        console.log('Desde Get -- Error')
        console.log('Estos son los errores: ', getErrors)
        return res.status(200).render('settings', { validaciones: errors.array(), dataUser: dataGet })
    } else {
        console.log('Cero errores')
        next()
    }
}

module.exports = validatorData