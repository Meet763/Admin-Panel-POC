const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const adminRoutes = require('./Routes/adminRoutes')
const employeeRoutes = require('./Routes/employeeRoutes')

app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: " GET, POST, PUT, DELETE, PATCH ",
    credentials: true, // Allows cookies to be sent with the request
}));

app.get('/', function (req, res) {
    res.send('welcome to admin panel')
})

app.use('/admin', adminRoutes)
app.use('/employee', employeeRoutes)

  
app.listen(PORT, () => {
    console.log(`Example app listening on port 3000`)
})