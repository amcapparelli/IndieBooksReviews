import reviewsIcon from 'resources/img/icono-resenas.png'

export const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

export const getFormInputs = () => {
    const button = document.getElementById('btn')
    const commentArea = document.querySelector('.comment-area')
    const inputs = document.querySelectorAll('.fields')
    button.addEventListener('click', (e) => {
        e.preventDefault()
        
    })
}

export default {
    printLogo, 
    getFormInputs
}