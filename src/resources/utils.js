import reviewsIcon from 'resources/img/icono-resenas.png'
import ConnectDB from 'database/conn';

export const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

export const getFormInputs = () => {
    const button = document.getElementById('btn')
    const commentArea = document.querySelector('.comment-area')
    const inputs = document.querySelectorAll('.fields')
    let connection = new ConnectDB()
    button.addEventListener('click', (e) => {
        e.preventDefault()
        const formData = {}
        inputs.forEach(input  => {
            formData[input.name] = input.value
            connection.post(formData)
        })
    })
}

export default {
    printLogo, 
    getFormInputs
}