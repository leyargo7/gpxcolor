import 'dotenv/config'
import express from 'express'
import { fileURLToPath } from 'url'
import {dirname} from 'path'
import path from 'path';
import session from 'express-session'
import bcrypt from 'bcryptjs'

const SESSION_SECRET = process.env.SESSION_SECRET;
const passData = process.env.ADMIN_PASS
const ADMIN_PASSWORD = bcrypt.hashSync(passData, 10)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

//setting express session
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{ secure: false }
}))

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//rutas para servir las paginas

app.get('/admin', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, 'public', 'admin.html'))
    } else {
        res.redirect('/log-in')
    }
})

app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'client.html'))
})

app.get('/log-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

//login
app.post('/login', (req, res) =>{
    const { username, password } = req.body
    if(username === 'admin' && bcrypt.compareSync(password, ADMIN_PASSWORD)){
        req.session.loggedIn = true
        res.json({success: true})
    } else {
        res.status(401).json({success: false, message: 'Credenciales incorrectas'})
    }

})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({ message: 'Error al hacer log out'})
        }
        res.clearCookie('connect.sid')
        res.json({success: true})
    })
})

export default app;