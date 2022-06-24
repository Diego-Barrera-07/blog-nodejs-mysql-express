const multer = require('multer')
const path = require('path')

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-BlogImg-' + file.originalname)
    }
    
})

const fileUpload = multer({
    storage: diskStorage
}).single('img')

module.exports = fileUpload