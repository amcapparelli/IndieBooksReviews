export function createNodes (container, parent, textNode) {
    let parentElement = document.createElement(parent)
    if ( parent === 'img' ) {
        parentElement.src = textNode
    } else {
        parentElement.appendChild(textNode)
    }
    container.appendChild(parentElement) 
}

export function showResults (data, parentDiv) {
    for (let key in data) {
        let value = document.createTextNode(data[key])
        if (key === 'title') {
            createNodes(parentDiv, 'h2', value)
        } else if (key === 'review') {
            value = document.createTextNode(data[key].toString().substring(0, 250))
            createNodes(parentDiv, 'p', value)
        } else if (key === 'cover' ){
            let valueToString = data[key]
            value = document.createTextNode(valueToString)
            createNodes(parentDiv, 'img', valueToString)
        } else if (key === 'author' || key === 'reviewer' || key === 'date' ) {
            createNodes(parentDiv, 'p', value)
        }
    }
}

export default {
    createNodes,
    showResults
}