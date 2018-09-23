import ConnectDB from 'database/conn';
import  avatar  from 'resources/img/avatar.png';
import { YoutubePlayerFunc } from 'resources/utils';


//show comments from DB
const showComments = (comments) => {
    let commentsAreaContanier = document.querySelector('.comment-area')
    if (comments.length !== 0) {
    comments.forEach(comment  => {
        let commentContainer = document.createElement('div')
        commentContainer.classList.add('comment-container')
        commentsAreaContanier.appendChild(commentContainer)
        let name = document.createElement('span')
        let message = document.createElement('p')
        name.innerHTML = comment.name+' comentó: '
        message.innerHTML = comment.message
        commentContainer.appendChild(message, name)
        commentContainer.insertBefore( name, message)
    })
    } else {
        commentsAreaContanier.innerHTML = `<p>Aún no hay comentarios. Sé el primero en comentar </p> `
    }   
}

//Connect to DB and get comments
export const getComments = (id) => {
    try {
        let connection = new ConnectDB()
        connection.get('comments').then(data => {
        let comments = data.filter(comment => comment.post_id == id)
        showComments(comments)
    }) 
    } catch (error) {
        console.log('Hubo un error al cargar los comentarios', error)
    }   
}

//Select avatar from DB or default avatar
const selectAvatar = (textNode, parentElement) => {
    if (textNode !== '') {
        parentElement.src = textNode
        parentElement.classList.add ('avatar')
    } else {
        parentElement.src = avatar
        parentElement.classList.add ('avatar')
    }
}

//Add readMore link on each review
const readMoreLink = (id, textNode, parentElement) => {
    let leeMas = document.createElement('p')
    leeMas.id = 'readmore-link'
    leeMas.innerHTML = `<a href="./review?id=${id}" > Leer artículo completo --> </a> <br>
    <a href="./review?id=${id}#comment-area" > Leer comentarios <i class="far fa-comment"></i> </a>`
    let extracto = document.createElement('span')
    extracto.innerHTML = textNode
    parentElement.appendChild(leeMas, extracto)
    parentElement.insertBefore(extracto, leeMas)
}

//Create each element of the reviews list
export function createNodes (container, parent, textNode, id) {
    let parentElement = document.createElement(parent)
    container.appendChild(parentElement)
    if ( parent === 'img' && id !== undefined ) {
        selectAvatar(textNode, parentElement)
    } else if ( parent === 'img' ) {
        parentElement.src = textNode
    } else if ( parent === 'div' ){
        parentElement.id = 'ytplayer'+id
        YoutubePlayerFunc(parentElement, parentElement.id, textNode)
    } else if ( parent === 'article') {
        readMoreLink(id, textNode, parentElement)
    } else {
        parentElement.appendChild(textNode)
    }
}

// Get Results from DB and create a text node with each one
export function showResults (data, parentDiv) {
    let id = data.id
    for (let key in data) {
        let value = document.createTextNode(data[key])
        if (key === 'title') {
            createNodes(parentDiv, 'h2', value)
        } else if (key === 'review') {
            value = data[key].toString().substring(0, 250)+'...'
            createNodes(parentDiv, 'article', value, id)
        } else if (key === 'video' ) {
            value = data[key].substring((data[key].length -11))
            createNodes(parentDiv, 'div', value, id)
        } else if ( key === 'cover' && data.video === undefined ){
            value = data[key]
            createNodes(parentDiv, 'img', value)
        } else if (key === 'date') {
            value = document.createTextNode(calculateDate(data[key]))
            createNodes(parentDiv, 'p', value)
        } else if (key === 'avatar') {
            value = data[key]
            createNodes(parentDiv, 'img', value, id)
        } else if (key === 'author') {
            value = document.createTextNode('Autor del libro: ' + data[key])
            createNodes(parentDiv, 'p', value)
        } else if (key === 'reviewer' ) {
            value = document.createTextNode('Autor de la reseña: ' + data[key])
            createNodes(parentDiv, 'p', value)
        }
    }
}

// calculate how long ago the review was published
const calculateDiffDate = (diffMins, diffHours, datePublishedDD, datePublishedMM, datePublishedYY) => {
    let valueDate = ''
    if (diffMins < 60 ) {
        valueDate = 'publicado hace '+ diffMins+ ' minutos'
    } else if (diffMins > 60 && diffMins < 1440 ){
        valueDate = 'publicado hace '+ diffHours+ ' horas'
    }
    else {
        valueDate = 'publicado el '+ datePublishedDD+ '/'+ datePublishedMM+ '/'+datePublishedYY
    }
    return valueDate
}

//get actual date and date of reviews
export function calculateDate(dateReviewPublished) {
    const date = new Date()
    const currentTime = date.getTime()
    const datePublished = new Date (dateReviewPublished)
    const datePublishedDD = datePublished.getDate() 
    const datePublishedMM = datePublished.getMonth() 
    const datePublishedYY = datePublished.getFullYear() 
    const diff = (currentTime - datePublished)
    const diffMins = Math.round(diff/60000)
    const diffHours = Math.round(diff/3600000)
    return calculateDiffDate(diffMins, diffHours, datePublishedDD, datePublishedMM, datePublishedYY)
}

export default {
    createNodes,
    showResults,
    calculateDate,
    getComments
}