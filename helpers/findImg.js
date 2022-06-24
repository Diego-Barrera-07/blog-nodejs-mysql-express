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
    // console.log(fileContents)
    // const name = String(Date.now())
    // // console.log('Nombre', name)
    // return fs.writeFileSync(name, fileContents, (err) => {
    //     if (err) {
    //         console.log('Hay un error')
    //     } else {
    //         console.log('Bien', fileContents)
    //     }
    // })
}

// const writeImg = (blob) => {
//     return new Promise(resolve => {
//       const url = URL.createObjectURL(blob)
//       let img = new Image()
//       img.onload = () => {
//         URL.revokeObjectURL(url)
//         resolve(img)
//       }
//       img.src = url
//     })
//   }


module.exports = { findImg, writeImg }