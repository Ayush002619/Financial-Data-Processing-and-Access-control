const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ALTAS_URL);
        console.log("MongoDB Connected")
    } catch(error) {
        console.error("DB Error:", error.message);
    }
}

module.exports = connectDB;