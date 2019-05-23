const mongoose = require('mongoose');
const { Users, SuperAdmin } = require('./models');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost/mongoose-test', { useNewUrlParser: true })
        console.log('Connected...')

        await Users.deleteMany()
        await SuperAdmin.deleteMany()

        const user = new Users({
            name: 'Llorenç',
            surname: 'Comellas',
            email: 'llorens@gmail.com',
            password: '123'
        })

        await user.save()

        const admin = new SuperAdmin({
            name: 'Felip',
            surname: 'Comellas',
            email: 'felip@gmail.com',
            password: '123'
        })

        await admin.save()


        await mongoose.disconnect()

    } catch (error) {
        console.error(error)
    }
})()