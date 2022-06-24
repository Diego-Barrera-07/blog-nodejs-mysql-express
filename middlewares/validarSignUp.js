const { validationResult } = require('express-validator')

const validarCampos = ((req, res) => {
    const errors = validationResult(req)
    if(errors){
        res.render('signUp', { validaciones: errors.array() })
    }
    console.log(errors)
})



module.exports = validarCampos