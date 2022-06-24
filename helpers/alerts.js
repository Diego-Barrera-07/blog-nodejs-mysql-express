const Swal = require('sweetalert2')

const typeOfAlert = (type) => {
    if(type == 1){
        Swal.fire({
            title: 'Error!',
            text: 'Este usuario o correo ya están vinculados a una cuenta',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
        })
    }
}
module.exports = typeOfAlert