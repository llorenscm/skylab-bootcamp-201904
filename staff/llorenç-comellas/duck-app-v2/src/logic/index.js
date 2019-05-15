import normalize from '../common/normalize'
import validate from '../common/validate'
import restApi from '../data/rest-api'
import { LogicError } from '../common/errors'


const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userToken__)
    },

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.create(email, password, { name, surname })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
            })
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.authenticate(email, password)

            .then(response => {
                if (response.status === 'OK') {
                    const { token } = response

                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },

    retrieveUser() {
        return restApi.retrieve(this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { user: { name, surname, email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
    },

    logoutUser() {
        // this.__userId__ = null
        // this.__userToken__ = null

        // OR fully remove all key values from session storage
        sessionStorage.clear()
    },


    // searchDucks(query) {
    //     validate.arguments([
    //         { name: 'query', value: query, type: 'string' }
    //     ])

    //     return duckApi.searchDucks(query)
    //         .then(ducks => ducks instanceof Array? ducks : [])
    // },

    // retrieveDuck(id) {
    //     validate.arguments([
    //         { name: 'id', value: id, type: 'string' }
    //     ])

    //     return duckApi.retrieveDuck(id)
    // },

    // toggleFavDuck(id) {
    //     validate.arguments([
    //         { name: 'id', value: id, type: 'string' }
    //     ])

    //     return restApi.retrieve(this.__userId__, this.__userToken__)
    //         .then(response => {
    //             const { status, data } = response

    //             if (status === 'OK') {
    //                 const { favs = [] } = data // NOTE if data.favs === undefined then favs = []

    //                 const index = favs.indexOf(id)

    //                 if (index < 0) favs.push(id)
    //                 else favs.splice(index, 1)

    //                 return restApi.update(this.__userId__, this.__userToken__, { favs })
    //                     .then(() => { })
    //             }

    //             throw new LogicError(response.error)
    //         })
    // },

    // retrieveFavDucks() {
    //     return restApi.retrieve(this.__userId__, this.__userToken__)
    //         .then(response => {
    //             const { status, data } = response

    //             if (status === 'OK') {
    //                 const { favs = [] } = data

    //                 if (favs.length) {
    //                     const calls = favs.map(fav => duckApi.retrieveDuck(fav))

    //                     return Promise.all(calls)
    //                 } else return favs
    //             }

    //             throw new LogicError(response.error)
    //         })
    // }
}

export default logic