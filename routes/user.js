const controller = require('../controllers/controller.user')
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const isAuthenticated = require('../helpers/isAuthenticatedUser')
const validarDataUser = require('../middlewares/validarSignIn')
const validarCampos = require('../middlewares/validarSignUp')
const validatorData = require('../middlewares/getErrors')
const fileUpload = require('../helpers/multer')



router.get('/', controller.index)
router.get('/publications', isAuthenticated, controller.publications)


// signIn page
router.get('/signIn' ,controller.signIn)
router.post('/signIn', [
    check('nickname', 'Ingresa un apodo o email valido').isLength({ min: 3 }).trim().escape(),
    check('pass', 'Ingresa correctamente tu contraseña, por favor con minimo 6 letras').isLength({ min: 6 }).trim().escape(),
    validarDataUser
], controller.userAcess)


// singUp page
router.get('/signUp', controller.signUp)
router.post('/signUp', [
    check('name', 'Ingresa correctamente tu nombre, por favor').isLength({ min: 3 }).trim().escape(),
    check('lastname', 'Ingresa correctamente tu apellido, por favor').isLength({ min: 3 }).trim().escape(),
    check('nickname', 'Ingresa correctamente tu apodo, por favor').isLength({ min: 6 }).trim().escape(),
    check('email', 'Escribe una dirección de correo valida, por favor').isEmail(),
    check('pass', 'Ingresa correctamente tu contraseña, por favor con minimo 6 letras').isLength({ min: 6 }).trim().escape(),
    validarCampos
], controller.saveUser)


// Make your post page
router.get('/makeYourPost', isAuthenticated, controller.makeYourPost)
router.post('/makeYourPost', fileUpload, controller.saveYourPost)

// Post
router.get('/post/:idPost', isAuthenticated, controller.post)

// My post
router.get('/myPost', isAuthenticated, controller.myPost)


// Settings user
router.get('/settings', isAuthenticated, controller.settings)

router.post('/settings', [
    check('name', 'Ingresa correctamente tu nombre, por favor').isLength({ min: 3 }).trim().escape(),
    check('lastname', 'Ingresa correctamente tu apellido, por favor').isLength({ min: 3 }).trim().escape(),
    check('nickname', 'Ingresa correctamente tu apodo, por favor').isLength({ min: 6 }).trim().escape(),
    check('pass', 'Ingresa correctamente tu contraseña, por favor con minimo 6 letras').isLength({ min: 6 }).trim().escape(),
    validatorData
], controller.saveSettings)

// Edit post

router.get('/editPost/:id', controller.getEditPost)
router.post('/editPost/:id', controller.saveEditPost)


// Close session
router.get('/closeSession', isAuthenticated, controller.closeSession)

router.get('*', ((req, res, next) => {
    res.status(404).send('Page not found')
}))

module.exports = router 