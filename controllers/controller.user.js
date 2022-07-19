const bcryptjs = require('bcryptjs')
const isAuthenticated = require('../helpers/isAuthenticatedUser')
const decodeData = require('../helpers/decodeToken')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

require('dotenv').config()

controller = []

const { findImg, writeImg } = require('../helpers/findImg')

controller.index = (req, res) => {
    if (req.cookies.jwt) {
        const author = jwt.verify(req.cookies.jwt, process.env.SECRETPRIVATEKEY, (err, decode) => {
            // console.log(`Este es el decode ${decode}, y este el error  ${err}`)
            if (decode) {
                return res.status(200).redirect('/publications')
            }
        })
    }
    res.render('index')
}
controller.publications = ((req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users INNER JOIN blog ON blog.author = users.id', (err, publications) => {
            if (err) {
                res.status(400).send('This is a error: ', err)
            }
            // console.log('Datos de la db', publications)
            publications = publications.reverse()
            const dataImg = publications.map(publication => writeImg(publication.img))

            res.render('publications', { dataPost: publications, dataImg: dataImg })
        })
    })

})
controller.signIn = (req, res) => {
    if (req.cookies.jwt) {
        const author = jwt.verify(req.cookies.jwt, process.env.SECRETPRIVATEKEY, (err, decode) => {
            if (decode) {
                return res.status(200).redirect('/publications')
            }
        })
    }
    res.render('signIn')
}

controller.userAcess = (req, res) => {
    res.redirect('/publications')
    console.log('Todo bien')
}

controller.signUp = ((req, res) => {
    if (req.cookies.jwt) {
        const author = promisify(jwt.verify)(req.cookies.jwt, process.env.SECRETPRIVATEKEY)
        if (author) {
            return res.status(200).redirect('/publications')
        }
    }
    res.render('signUp')
})

controller.saveUser = ((req, res) => {
    const data = req.body
    const { pass } = data
    console.log('Datos:', data)
    req.getConnection((err, conn) => {
        //Hash to passwords 
        const salt = bcryptjs.genSaltSync()
        data.pass = bcryptjs.hashSync(pass, salt)
        // Send data 
        conn.query('INSERT INTO users set ?', data, (err, user) => {
            console.log('Enviadoooos')
            res.redirect('/signIn')
        })
    })
})


controller.makeYourPost = async (req, res) => {
    const author = promisify(jwt.verify)(req.cookies.jwt, process.env.SECRETPRIVATEKEY)
    console.log(author)
    // console.log(decodeData())
    res.render('makeYourPost')
}


controller.saveYourPost = ((req, res) => {
    const data = req.body

    const title = data.title

    const author = decodeData()

    let anonymity = true
    if (data.anonymity !== 'true') {
        anonymity = false
    }
    const content = data.content

    console.log('Recibido: ', title, anonymity, content)


    const imgName = req.file.filename
    const file = findImg(imgName)


    req.getConnection((err, conn) => {
        conn.query('INSERT INTO blog set ?', [{ img: file, title, author, anonymity, content }], (err, go) => {
            if (err) { console.error(err) } else { console.log('Todo bien') }
        })
    })

    res.status(200).redirect('/publications')
})

controller.post = ((req, res) => {
    const idPost = req.params.idPost
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM blog INNER JOIN users ON blog.author = users.id WHERE blog.id = ?', [idPost], (err, dataPost) => {
            if (!dataPost[0]) {
                console.log(err)
                return res.status(404).send('No existe ese post')
            }

            if (dataPost) {
                console.log(dataPost[0])
                const decodificadaImg = writeImg(dataPost[0].img)
                res.render(`post.ejs`, { dataPost: dataPost, decodificadaImg: decodificadaImg })
            }
        })
    })
})


controller.settings = ((req, res) => {
    const author = jwt.verify(req.cookies.jwt, process.env.SECRETPRIVATEKEY)
    // console.log('Jwt user data: ', author)
    const nickname = author.data
    // console.log('Jwt user data nikcname: ', nickname)
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE nickname = ?', [nickname], (err, dataUser) => {
            // console.log(err)
            console.log('Data de usuario: ', dataUser)
            res.render('settings.ejs', { dataUser: dataUser })
        })
    })
})


controller.saveSettings = (req, res) => {
    console.log('Datos recibidos desde el controller: ', req.body)
    const newData = req.body
    const email = newData.email
    console.log(email)
    req.getConnection((err, conn) => {
        conn.query('UPDATE users set ? WHERE email = ?', [newData, email], (err, data) => {
            if (err) {
                return console.log(err)
            }
        })
    })
    res.status(200).redirect('/publications')
}


controller.closeSession = ((req, res) => {
    res.clearCookie('jwt')
    res.status(200).redirect('/')
})

module.exports = controller