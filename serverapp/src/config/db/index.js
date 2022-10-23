const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://vantruong:2dYodEHOWiwtzQ4k@cluster0.49nl0.mongodb.net/ecomWeb?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        )
        console.log('Connect successfully!!!')
    } catch (error) {
        console.log('Connect failure!!!')
    }
}
module.exports = { connect }
