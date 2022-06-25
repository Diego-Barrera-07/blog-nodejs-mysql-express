const scrollAnimation = () => {
    let scrollTop = document.documentElement.scrollTop
    if(scrollTop > 170){
        // window.scroll(0, 210)
        document.querySelector('.fondo').classList.add('small')
        document.querySelector('.titulo__contenido').classList.add('small')
    }
    if(scrollTop < 170){
        document.querySelector('.fondo').classList.remove('small')
        document.querySelector('.titulo__contenido').classList.remove('small')
    }
    console.log(scrollTop)
}

window.addEventListener('scroll', scrollAnimation)