import './styles/main.scss';
import reviewsIcon from './resources/img/icono-resenas.png';
import connect from './dataBase/conn'
import { showResults } from './resources/functions'

const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

printLogo()

const listInfo = () => {
    connect().then(data => data.map(review => {
        let list = document.querySelector('.articles-list')
        let reviewExtractContainer = document.createElement('div')
        reviewExtractContainer.className = 'review-extract'
        list.appendChild(reviewExtractContainer)
        showResults(review, reviewExtractContainer)
    }))
}

listInfo()
