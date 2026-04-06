require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const user = require("./models/user");
connectDB();

const testUser = async () => {
    await user.create({
        name: "Ayushk",
        email: "ayushk@gmail.com",
        password: "123456",
        role: "admin"
    });
    console.log("Test user created");
}
// testUser();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});