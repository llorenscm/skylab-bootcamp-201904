import validate from '../../common/validate'
import call from '../../common/call'

const {REACT_APP_PORT} = process.env

const restApi = {
    __url__: `http://localhost:${REACT_APP_PORT}/api`,
    __timeout__: 0,

    create(email, password, data) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true, optional: true }
        ])

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, ...data }),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    authenticate(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    retrieve(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    update(id, token, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/user/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    // searchDucks(query) {
    //     validate.arguments([
    //         { name: 'query', value: query, type: 'string' }
    //     ])
        
    //     return call(`${this.__url__}/search?q=${query}`)
    //         .then(response => response.json())
    // },

    // retrieveDuck(id) {
    //     validate.arguments([
    //         { name: 'id', value: id, type: 'string' }
    //     ])

    //     return call(`${this.__url__}/ducks/${id}`)
    //         .then(response => response.json())
    // }
}

export default restApi