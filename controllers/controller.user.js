const bcryptjs = require('bcryptjs')
const cookieParser = require('cookie-parser')
const res = require('express')
const isAuthenticated = require('../helpers/isAuthenticatedUser')
controller = []

const { findImg, writeImg } = require('../helpers/findImg')

controller.index = ((req, res) => {
    res.render('index')
})
controller.publications = ((req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users INNER JOIN blog ON blog.author = users.id', (err, publications) => {
            if (err) {
                res.status(400).send(err)
            }
            // console.log('Datos de la db', publications)
            publications = publications.reverse()
            const dataImg = publications.map(publication => writeImg(publication.img))

            res.render('publications', { dataPost: publications, dataImg: dataImg })
        })
    })

})
controller.signIn = ((req, res) => {
    res.render('signIn')
})
controller.userAcess = (req, res) => {
    res.redirect('/publications')
    console.log('Todo bien')
}

controller.signUp = ((req, res) => {
    const idUser = isAuthenticated
    console.log(idUser)

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


controller.makeYourPost = ((req, res) => {
    res.render('makeYourPost')
})


controller.saveYourPost = ((req, res) => {
    const data = req.body

    const title = data.title
    const author = 28
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
    // res.render('post.ejs')
})


controller.settings= ((req, res) => {
    res.render('settings.ejs')
})


controller.closeSession = ((req, res) => {
    res.clearCookie('jwt')
    res.status(200).redirect('/')
})

module.exports = controller