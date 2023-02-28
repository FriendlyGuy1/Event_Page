const mongoose = require("mongoose");

mongoose.set("strictQuery",false)

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECT)
        console.log(`connect to MongoDB ${connection.connection.host}`)
    } catch(error) {
        console.log("cant connect", error)
        process.exit(1)
    }
}

module.exports = connectDB