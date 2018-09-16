import './styles/main.scss';
import reviewsIcon from './resources/img/icono-resenas.png';
import connect from './dataBase/conn'
import { createNodes } from './resources/utils'

const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

printLogo()

const listInfo = () => {
    let list = document.querySelector('.articles-list')
    connect().then(data => data.map(review => {
        let paragraph = document.createElement('p')
        let span = document.createElement('span') 
        let author = document.createTextNode('autor: ' + review.author)
        let article = document.createTextNode(review.review)
        paragraph.appendChild(article)
        span.appendChild(author)
        list.appendChild(paragraph)
        list.appendChild(span)
    }))
}

listInfo()
