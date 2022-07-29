const fs = require('fs');
const { Buffer } = require('buffer');
const path = require('path');

const findImg = (name) => {
    return fs.readFileSync(path.join(__dirname, '../images/' + name))
}

const writeImg = (img) => {
    const b64 = Buffer.from(img).toString('base64')
    const mimeType = 'image/png'; 
    const url = `data:${mimeType};base64,${b64}`
    return url
}



module.exports = { findImg, writeImg }