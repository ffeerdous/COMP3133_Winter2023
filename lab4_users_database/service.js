const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/users")

const app = express();
app.use(express.json());
const SERVER_PORT = 3000
const DB = "mongodb+srv://ffeerdous:Feerdaus12@cluster0.kuvhkkr.mongodb.net/UsersDb?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/", userRoutes)

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})