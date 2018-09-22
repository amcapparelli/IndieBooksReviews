import './review-styles.scss';
import ConnectDB from 'database/conn';
import queryString from 'query-string';
import { printLogo, getFormInputs, YoutubePlayerFunc } from 'resources/utils';
import { calculateDate, getComments } from 'resources/functions'

const query = queryString.parse(window.location.search);
const reviewId = query && query.id;

printLogo()

const likeReview = (id) => {
    let star = document.querySelector('.like')
    const likeStatus = localStorage.getItem(`review_${id}`)
    if ( likeStatus === 'true' ) {
        star.children[0].classList.add('fas')
    }
    star.addEventListener('click', () => {
        star.children[0].classList.toggle('fas')
        const likeStatus = localStorage.getItem(`review_${id}`)
        if ( likeStatus !== 'true' ) {
            localStorage.setItem(`review_${id}`, 'true')
        } else {
            localStorage.setItem(`review_${id}`, 'false')
        }
    })
}


const completeReview = (id) => {
    let reviewContainer = document.querySelector('.full-article-container')
    let connection = new ConnectDB()
    connection.get('reviews').then(data => {
        let review = data.filter(review => review.id == id)
        reviewContainer.innerHTML = `<h1>${review[0].title}</h1>
                                    <h2>Autor: ${review[0].author}</h2>
                                    <h2>Autor de la reseña: ${review[0].reviewer}</h2>
                                    <p>fecha de publicación: ${calculateDate(review[0].date)} </p>
                                    <button class="like" > <i class="far fa-star"></i> </button>
                                    <figure>
                                        <img src="${review[0].cover}" alt="portada de ${review[0].title}">
                                    </figure>
                                    <div id="ytplayer"> </div>
                                    <article>${review[0].review}</article>  `
    likeReview(reviewId)
    YoutubePlayerFunc(reviewContainer, review[0].video.substring((review[0].video.length -11)))
    }).then(getComments(id))
}

completeReview(reviewId)
getFormInputs(reviewId)


