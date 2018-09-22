import ConnectDB from 'database/conn';
import  avatar  from 'resources/img/avatar.png';
import { YoutubePlayerFunc } from 'resources/utils';

export function createNodes (container, parent, textNode, id) {
    let parentElement = document.createElement(parent)
    container.appendChild(parentElement)
    if ( parent === 'img' && id !== undefined ) {
        if (textNode !== '') {
            parentElement.src = textNode
            parentElement.classList.add ('avatar')
        } else {
            parentElement.src = avatar
            parentElement.classList.add ('avatar')
        }
    } else if ( parent === 'img' ) {
        parentElement.src = textNode
    } else if ( parent === 'div' ){
        parentElement.id = 'ytplayer'
        YoutubePlayerFunc(parentElement, textNode)
    } else if ( parent === 'article') {
        let leeMas = document.createElement('p')
        leeMas.id = 'readmore-link'
        leeMas.innerHTML = `<a href="./review?id=${id}" > Leer artículo completo --> </a> <br>
                            <a href="./review?id=${id}#comment-area" > Leer comentarios --> </a>`
        let extracto = document.createElement('span')
        extracto.innerHTML = textNode
        parentElement.appendChild(leeMas, extracto)
        parentElement.insertBefore(extracto, leeMas)
    }
    else {
        parentElement.appendChild(textNode)
    }
}

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
            createNodes(parentDiv, 'div', value)
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

export function calculateDate(dateReviewPublished) {
    let valueDate = ''
    const date = new Date()
    const currentTime = date.getTime()
    const datePublished = new Date (dateReviewPublished)
    const datePublishedDD = datePublished.getDate() 
    const datePublishedMM = datePublished.getMonth() 
    const datePublishedYY = datePublished.getFullYear() 
    const diff = (currentTime - datePublished)
    const diffMins = Math.round(diff/60000)
    const diffHours = Math.round(diff/3600000)
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

export const showComments = (comments) => {
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
        commentsAreaContanier.innerHTML = ` <p>Aún no hay comentarios. Sé el primero en comentar </p> `
    }   
}

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

export default {
    createNodes,
    showResults,
    calculateDate,
    getComments,
    showComments
}