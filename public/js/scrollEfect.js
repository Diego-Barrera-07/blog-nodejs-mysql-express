// console.log('Hola')

let elements = document.querySelectorAll('.post')
console.log(elements)
// console.log('scroll inicio',scrollTop)
console.log(elements[0].offsetTop)

const showElements = () => {
    let scrollTop = document.documentElement.scrollTop;
    // let alturaElemento1= elements[0].offsetTop;
    // console.log('Elemento: ', alturaElemento1)
    // console.log(scrollTop)
    for (let i = 0; i < elements.length; i++) {
        let alturaElemento = elements[i].offsetTop;
        if(alturaElemento < scrollTop + 500){
            // console.log(`Altura elemento ${[0]}`, alturaElemento )
            // console.log(`Scroll ${[0]}`, scrollTop)
            elements[i].classList.add('on')
            elements[i].classList.remove('off')
            // console.log(scrollTop + 30)
        }
        if(alturaElemento + 100  < scrollTop){
            console.log(`Altura elemento ${[i]}`, alturaElemento - 100)
            console.log(`Scroll ${[i]}`, scrollTop)
            elements[i].classList.remove('on')
            elements[i].classList.add('off')
        }
    }

}
window.onload = showElements()
window.addEventListener('scroll', showElements)
