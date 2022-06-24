const Swal = require('sweetalert2')

const validationUser = async (data, connection) => {
    const { nickname, email } = data
    // console.log(nickname, email)
    conn.query('SELECT * FROM users WHERE nickname = ? AND email = ?', [nickname, email], (err, user) => {
        if (user[0]) {
            console.log('hola')
            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Este usuario o correo ya están vinculados a una cuenta',
            //     icon: 'error',
            //     confirmButtonText: 'Intentar nuevamente'
            // })
            return;
        } else {
            console.log('Todo bien')
            return alerts(1)
            // res.redirect('/signUp')
            // Swal.fire({
            //     title: 'Error!',
            //     text: 'Este usuario o correo ya están vinculados a una cuenta',
            //     icon: 'error',
            //     confirmButtonText: 'Intentar nuevamente'
            // })
        }
    })
}

module.exports = validationUser







// req.getConnection((err, conn) => {
//     const { nickname, email } = data
//     // console.log(nickname, email)
//     conn.query('SELECT * FROM users WHERE nickname = ? AND email = ?', [nickname, email], (err, user) => {
//         if (user[0]) {
//             console.log('hola')
//             // Swal.fire({
//             //     title: 'Error!',
//             //     text: 'Este usuario o correo ya están vinculados a una cuenta',
//             //     icon: 'error',
//             //     confirmButtonText: 'Intentar nuevamente'
//             // })
//             return;
//         } else {
//             console.log('Todo bien')
//             return alerts(1)
//             // res.redirect('/signUp')
//             // Swal.fire({
//             //     title: 'Error!',
//             //     text: 'Este usuario o correo ya están vinculados a una cuenta',
//             //     icon: 'error',
//             //     confirmButtonText: 'Intentar nuevamente'
//             // })
//         }
//     })
// })