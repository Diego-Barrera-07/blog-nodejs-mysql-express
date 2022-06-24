const jwt = require('jsonwebtoken')
const { promisify } = require('util')

require('dotenv').config()


const isAuthenticated = async (req, res, next) => {
    console.log('Token en las cookies: ', req.cookies.jwt)

    if (req.cookies.jwt) {

        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.SECRETPRIVATEKEY)
            console.log('Data de la cookie: ', decodificada.data)

            const nickname = decodificada.data.nickname
            const idUser = decodificada.data.id
            console.log('Nickname desde JWT: ', nickname)

            req.getConnection((err, conn) => {
                conn.query('SELECT * FROM users WHERE email = ? OR nickname = ?', [nickname, nickname], (err, results) => {
                    console.log('resultado: ', results[0])
                    if (results[0]) {
                        console.log('Son datos reales')
                        const id = results[0].id
                        console.log(id)
                        next()
                        return id
                        // return res.status(200).redirect('/publications')
                    }
                    if (err) {
                        console.log('Hay un error: ', err)
                    }
                })
            })


        } catch (error) {
            console.log('No se pudo autenticar - cath')
            return next()
        }

    } else {
        console.log('No hay ningun token')
        return next()
        // res.redirect('/publications')
    }
}

module.exports = isAuthenticated