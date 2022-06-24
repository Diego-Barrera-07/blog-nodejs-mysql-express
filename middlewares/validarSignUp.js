const { validationResult } = require('express-validator')
// const bcryptjs = require('bcryptjs')

const validarCampos = ((req, res, next) => {
    const data = req.body
    console.log('Datos recibidos:', data)

    const errors = validationResult(req)
    let validaciones = errors.array()
    console.log('Errores iniciales: ', validaciones)
    
    if (validaciones == []) {
        return res.status(200).render('signUp', { validaciones })
    }

    req.getConnection((err, conn) => {
        const { nickname, email } = data

        conn.query('SELECT * FROM users WHERE email = ? OR nickname = ?', [email, nickname], (err, user) => {
            console.log('Query :', user[0].email)
            if(user[0]){
                console.log('Todo en orden')
            }

            if (err) {
                validaciones.push({
                    msg: 'No se pudo realizar la consulta por problemas en la base de datos, intentalo más tarde',
                    param: 'nickname',
                    location: 'body'
                })
                return res.status(200).render('signIn', { validaciones, data })
            }

            
            if (user[0].nickname == nickname) {
                validaciones.push({
                    value: `${data.nickname}`,
                    msg: 'Este apodo ya está en uso',
                    param: 'nickname',
                    location: 'body'
                })
                return res.status(200).render('signUp', { validaciones })
            }
            
            if (user[0].email == email) {
                validaciones.push({
                    value: `${data.email}`,
                    msg: 'Este correo ya está en uso',
                    param: 'email',
                    location: 'body'
                })
                return res.status(200).render('signUp', { validaciones })
            }

        })
    })
})



module.exports = validarCampos