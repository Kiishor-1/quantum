const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
dotenv.config()

const app = express()
const port = process.env.PORT || 8080

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log('MongoDb is connected...');
})

app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hello User Welcome to Rooftop Heaven Admin Panel')
})

app.use('/api/auth', authRoutes)

app.all("*", (req, res, next) => {
    const error = new Error("No such routes available");
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || "Internal Server Error",
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port} port number`);
})