const clientSocket = io()

clientSocket.on('changeColor', (color) => {
    document.body.style.backgroundColor = color
})


clientSocket.on('updateText', (text) => {
    document.getElementById('displayText').innerText = text
})


clientSocket.on('reloadPage', () => {
    location.reload()
})