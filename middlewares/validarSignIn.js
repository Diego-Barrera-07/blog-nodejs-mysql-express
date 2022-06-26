const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const generatorJwt = require('../helpers/generateJwt')


const validarDataUser = (req, res, next) => {
    const data = req.body
    console.log('Datos recibidos', data)
    
    const errors = validationResult(req)
    let validaciones = errors.array()

    console.log('Errores: ', validaciones)

    if (validaciones == []) {
        return res.status(200).render('signIn', { validaciones: validaciones, data: data })
    }

    req.getConnection((err, conn) => {
        const { nickname, pass } = data

        conn.query('SELECT * FROM users WHERE email = ? OR nickname = ?', [nickname, nickname], (err, user) => {
            if (err) {
                validaciones.push({
                    msg: 'No se pudo realizar la consulta por problemas en la base de datos, intentalo más tarde',
                    param: 'nickname',
                    location: 'body'
                })
                return res.status(200).render('signIn', { validaciones, data })
            }

            if (!user[0]) {
                validaciones.push({
                    msg: 'El apodo o correo no existen, o el campo está vacío',
                    param: 'nickname',
                    location: 'body'
                })
                return res.status(200).render('signIn', { validaciones, data })
            }

            const passwordValidation = bcryptjs.compareSync(pass, user[0].pass)
            
            if (!passwordValidation) {
                validaciones.push({
                    msg: 'La contraseña es incorrecta',
                    param: 'pass',
                    location: 'body'
                })
                return res.status(200).render('signIn', { validaciones, data })
            }

            // Generar token - jwt
            try {
                const token = generatorJwt(data)
                console.log('Token: ', token)

                const cookiesOption = {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOption)
                res.status(200).redirect('/publications')
            } catch (error) {
                console.log('Hay un error al crear el token')
            }
        })
    })
}




module.exports = validarDataUser
