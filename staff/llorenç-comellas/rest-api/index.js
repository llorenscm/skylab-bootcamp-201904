const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

app.post('/user', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.json({ message: 'Ok, user registered. ' }))
            .catch(({ message }) => {
                res.status(400).json({ error: message })
            })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

app.post('/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then((token) => res.json(token))
            .catch(({ message }) => {
                res.status(400).json({ error: message })
            })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }

})

app.get('/user', (req, res) => {
    let { headers: { authorization: token } } = req
    token = token.split(' ')[1]

    try {
        logic.retrieveUser(token)
            .then(data => res.json(data))
            .catch(({ message }) => {
                res.status(400).json({ error: message })
            })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }

})

app.get('ducks', jsonParser, (req, res) => {
    let { headers: { authorization: token } } = req
    token = token.split(' ')[1]

    const { query } = req

    logic.searchDucks(token, query)


})

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))



// app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
//     const { query: { query }, logic, session } = req

//     session.query = query

//     logic.searchDucks(query)
//         .then(ducks => {
//             ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({ id, url: `/home/duck/${id}`, favUrl: `/home/fav/${id}`, cartUrl: `/home/cart/${id}`, title, image, price }))

//             return logic.retrieveFavDucks()
//                 .then(favs => {
//                     ducks.forEach(duck => duck.isFav = favs.some(fav => fav.id === duck.id))

//                     return logic.retrieveUser()
//                         .then(({ name }) => res.render('home', { name, query, ducks }))
//                 })
//         })
//         .catch(({ message }) => res.render('home', { name, query, message }))
// })

// app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
//     const { params: { id }, logic, session: { query } } = req

//     logic.retrieveDuck(id)
//         .then(({ title, imageUrl: image, description, price }) => {
//             const duck = { title, image, description, price, favUrl: `/home/fav/${id}`, cartUrl: `/home/cart/${id}` }

//             return logic.retrieveFavDucks()
//                 .then(favs => {
//                     duck.isFav = favs.some(fav => fav.id === id)

//                     return logic.retrieveUser()
//                         .then(({ name }) => res.render('home', { query, name, duck }))
//                 })
//         })
// })

// app.post('/home/fav/:id', checkLogin('/', false), (req, res) => {
//     const { params: { id }, logic, session: { query } } = req

//     logic.toggleFavDuck(id)
//         .then(() => res.redirect(req.get('referer')))
//         .catch(({ message }) => res.render('home', { name, query, message }))
// })

// app.post('/logout', (req, res) => {
//     req.session.destroy()

//     res.redirect('/')
// })