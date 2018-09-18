import 'styles/main.scss';
import reviewsIcon from 'resources/img/icono-resenas.png';
import  ConnectDB  from 'database/conn';
import { printLogo } from 'resources/utils';
import { showResults } from 'resources/functions';

printLogo()

const listInfo = () => {
    let list = document.querySelector('.articles-list')
    let connection = new ConnectDB()
    connection.get().then(data => data.map(review => {
        let reviewExtractContainer = document.createElement('div')
        reviewExtractContainer.className = 'review-extract'
        list.appendChild(reviewExtractContainer)
        showResults(review, reviewExtractContainer)
    }))
}

listInfo()

