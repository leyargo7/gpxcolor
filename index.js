import app from './src/app.js'
import {Server as WebSocketServer} from 'socket.io'
import http from 'http'
import sockets from './src/sockets.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app)
const httpServer = server.listen(port, () => {
    console.log(`server on port ${port}`)
})
const io = new WebSocketServer(httpServer)

sockets(io);
