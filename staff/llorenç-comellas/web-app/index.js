const express = require('express')
const bodyParser = require('./body-parser')

const favicon = require('serve-favicon')
const path = require('path')


const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))
app.use(favicon(path.join('public', 'images', 'favicon.ico')))

let user = {}

let isLogin = false

function render(body) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        ${body}
    </body>
    </html>`
}
app.get('/', (req, res) =>
    res.send(render(`<a href="/login">login</a><a href="/register">register</a>`))

)

app.get('/register', (req, res) => {
    res.send(render(`<form method="post" action="/register">
            <input type="text" name="username" placeholder="username" required >
            <input type="password" name="password" placeholder="password" required>
            <button>Register</button>
        </form>`))
})

app.post('/register', bodyParser, (req, res) => {

    const { username, password } = req.body

    user.username = username
    user.password = password

    if (username && password) res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`))
    else {
        res.send(render(`<form method="post" action="/register" >
            <input type="text" name="username" placeholder="username" >
            <input type="password" name="password" placeholder="password" >
            <button>Register</button>
        </form><p>Field empty</p>`))
    }
})

app.get('/login', (req, res) =>
    res.send(render(`<form method="post" action="/login">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button>Login</button>
        </form>`))

)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) res.redirect('/home')

    else res.send(render(`<form method="post" action="/login">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <button>Login</button>
</form><p>Wrong credentials.</p>`))
})

app.get('/home', (req, res) =>
    res.send(render(`<h1>Hello, ${user.username}!`))
)

app.listen(port)