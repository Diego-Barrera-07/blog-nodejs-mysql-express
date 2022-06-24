const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const generatorJwt = require('./generateJwt')


const validarDataUser = (req, res, next) => {
    const data = req.body
    console.log('Datos recibidos', data)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.redirect('/signIn')
        return console.log(errors)
    }

    req.getConnection((err, conn) => {
        
        const { nickname, pass } = data
        console.log(data.pass)
        
        console.log('Nickname: ', nickname)
        conn.query('SELECT * FROM users WHERE email = ? OR nickname = ?', [nickname, nickname], (err, user) => {
            // console.log('Data: ', user[0])
            if (!user[0]) {
                res.redirect('/signIn')
                // return console.log('Este usuario no existe')
            }
            console.log(user[0].pass)

            const passwordValidation = bcryptjs.compareSync(pass, user[0].pass)

            if(!passwordValidation){
                res.redirect('/signIn')
                console.log('Es verdadera')
            }

            // Generar token - jwt
            try {
                const token = generatorJwt(data)
                // console.log('Token: ', token)

                const cookiesOption = {
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookiesOption)


                res.redirect('/publications')
                // return console.log('Este usuario existe')


            } catch (error) {
                console.log('Hay un error al crear el token')
            }
        })
    })
}




module.exports =  validarDataUser
