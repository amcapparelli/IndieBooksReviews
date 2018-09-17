export function createNodes (container, parent, textNode, id) {
    let parentElement = document.createElement(parent)
    container.appendChild(parentElement)
    if ( parent === 'img' ) {
        parentElement.src = textNode
    } else if ( parent === 'article') {
        let p = document.createElement('p')
        p.innerHTML = `<a href="./review?id=${id}" > Leer artículo Completo </a>`
        parentElement.appendChild(p)
        let parentContainer = parentElement.parentNode
        parentContainer.insertBefore(textNode, parentElement)
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
            value = document.createTextNode(data[key].toString().substring(0, 250)+'...')
            createNodes(parentDiv, 'article', value, id)
        } else if (key === 'cover' ){
            value = data[key]
            createNodes(parentDiv, 'img', value)
        } else if (key === 'author' || key === 'reviewer' || key === 'date' ) {
            createNodes(parentDiv, 'p', value)
        }
    }
}

export default {
    createNodes,
    showResults
}