

export function createNodes (container, parent, textNode) {
    let parentElement = document.createElement(parent)
    parentElement.appendChild(textNode)
    container.appendChild(parentElement)   
}

export default createNodes