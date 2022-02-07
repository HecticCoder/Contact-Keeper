const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')  //to connect the env variables

const connectDB = async () => {
    try{
        await mongoose.connect(db)
        console.log('mongodb connected')
    }
    catch (err) {
        console.error(err.message)  //displays error
        process.exit(1) //exit with failure
    }

}


module.exports = connectDB