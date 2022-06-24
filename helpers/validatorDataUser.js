const nameValidation = (name = '') => {  
    const maximo = 35;
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if (!name.value) {
        throw new Error('Está vacío el nombre')
    } else if (name.value.length > maximo) {
        throw new Error('El maximo son 35 letras')
    } else if (!pattern.test(name.value)) {
        throw new Error('Deben ser solo letras')
    } else {
        console.log('Todo bien con los datos')
    }
}


const emailValidation = (email) => {

    console.log('hola')
}

module.exports = {
    nameValidation
}