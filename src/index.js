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
    connect().then(data => data.map(review => {
        let list = document.querySelector('.articles-list')
        let reviewExtract = document.createElement('div')
        reviewExtract.className = 'review-extract'
        list.appendChild(reviewExtract)
        for (let key in review) {
            let value = document.createTextNode(review[key])
            if (key === 'title') {
                createNodes(reviewExtract, 'h2', value)
            } else if (key === 'review') {
                value = document.createTextNode(review[key].toString().substring(0, 250))
                createNodes(reviewExtract, 'p', value)
            } else {
                createNodes(reviewExtract, 'p', value)
            }
        }
    }))
}

listInfo()
