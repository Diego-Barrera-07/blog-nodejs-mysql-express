const jwt = require('jsonwebtoken')
const { promisify } = require('util')

require('dotenv').config()


const isAuthenticated = async (req, res, next) => {
    console.log('Token en las cookies: ', req.cookies.jwt)

    if (req.cookies.jwt) {

        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.SECRETPRIVATEKEY, (err) => {
                if (err) {
                    console.log('Este es el error en el Token:', err)
                    return res.status(200).redirect('/signIn')
                }
            })
            // console.log('Data de la cookie: ', decodificada.data)

            const nickname = decodificada.data
            // console.log('Nickname desde JWT: ', nickname)

            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM users WHERE email = ? OR nickname = ?', [nickname, nickname], (err, results) => {
                    // console.log('resultado: ', results[0])
                    if (results[0]) {
                        next()
                    }

                    if (!results[0]) {
                        return res.status(200).redirect('/signIn')
                    }

                    if (err) {
                        console.log('Hay un error: ', err)
                        return res.status(200).redirect('/signIn')
                    }
                })
            })


        } catch (error) {
            console.log('No se pudo autenticar usuario - cath')
            return res.status(200).redirect('/signIn')
        }

    } else {
        console.log('No hay token')
        return res.status(200).redirect('/signIn')
    }
}

module.exports = isAuthenticated