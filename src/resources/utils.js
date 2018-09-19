import reviewsIcon from 'resources/img/icono-resenas.png'
import ConnectDB from 'database/conn';


const checkForm = (form, inputs) => {
    let formData = {}
    form.reportValidity()
    if (form.checkValidity()) {
        let connection = new ConnectDB()
        inputs.forEach(input => {
            formData[input.name] = input.value
            connection.post(formData)
        })
    }
}

export const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

export const getFormInputs = () => {
    const form = document.querySelector('.form-comments')
    const button = document.getElementById('btn')
    const inputs = document.querySelectorAll('.fields')
    button.addEventListener('click', (e) => {
        e.preventDefault()
        checkForm(form, inputs)
    })
}

export default {
    printLogo, 
    getFormInputs
}