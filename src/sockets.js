export default (io) => {


    io.on('connection', (socket) => {
        
        socket.on('changeColor', (color) => {
            io.emit('changeColor', color)
        })

        socket.on('updateText', (text) => {
            io.emit('updateText', text)
        })

        socket.on('reloadClients', () => {
            io.emit('reloadPage')
        })

    })

}