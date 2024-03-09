const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./utils/routes')
const cookieParser = require('cookie-parser')


const app = express()
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB works fine...");})
.catch((error) => { console.log(error); })

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api", routes)

const server = app.listen(process.env.PORT, () =>{
    console.log(`Server is on port ${process.env.PORT}, HELLO WORLD!`);
})





