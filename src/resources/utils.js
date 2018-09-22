import reviewsIcon from 'resources/img/icono-resenas.png'
import ConnectDB from 'database/conn';


const checkForm = (form, inputs, id) => {
    let formData = { }
    form.reportValidity()
    if (form.checkValidity()) {
        let connection = new ConnectDB()
        inputs.forEach(input => {
            formData[input.name] = input.value
        })
        formData["post_id"] = parseInt(id)
        connection.post(formData, 'comments')
    }
}

export const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

export const getFormInputs = (id) => {
    const form = document.querySelector('.form-comments')
    const button = document.getElementById('btn')
    const inputs = document.querySelectorAll('.fields')
    button.addEventListener('click', (e) => {
        e.preventDefault()
        checkForm(form, inputs, id)
    })
}

export const showMobileMenu = () => {
    let btn = document.getElementById('btn-MenuMobile')
    let mobileMenu = document.querySelector('.wrapper-nav-mobile')
    btn.addEventListener('click',  () => {
        mobileMenu.classList.toggle('hidden')
    })
}

export default {
    printLogo, 
    getFormInputs,
    showMobileMenu
}