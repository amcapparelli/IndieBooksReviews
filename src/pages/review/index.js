import './review-styles.scss';
import connect from 'database/conn';
import queryString from 'query-string';
import { printLogo } from 'resources/utils';

const query = queryString.parse(window.location.search);
const reviewId = query && query.id;

printLogo()

const completeReview = (id) => {
    let reviewContainer = document.querySelector('.full-article-container')
    connect().then(data => {
        let review = data.filter(review => review.id == id)
        reviewContainer.innerHTML = `<h1>${review[0].title}</h1> 
                                    <h2>Autor: ${review[0].author}</h2>
                                    <h2>Autor de la reseña: ${review[0].reviewer}</h2>
                                    <p>fecha de publicación: ${review[0].date}</p>
                                    <figure>
                                        <img src="${review[0].cover}" alt="portada de ${review[0].title}">
                                    </figure>
                                    <article>${review[0].review}</article>  `
    })
        
}
completeReview(reviewId)