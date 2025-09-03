const mongoose= require("mongoose")
const mongoDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log(`server running on ${mongoose.connection.host}`)
        
    } catch (error) {
        console.log(`Error:- ${error}`)
    }
}

module.exports = {mongoDb};

