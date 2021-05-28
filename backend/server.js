const express = require('express')
const app = express()
const port = process.env.PORT || 5000

// importing dotenv
require('dotenv').config()

// importing mongoose 
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// importing path for production build
const path = require('path')

// creating a mongodb connection
const database = mongoose.connection
database.once('open', () => console.log('Connection to database!'))


// importing fruits routes
const  fruitsRouter = require('./routes/fruits')

app.use(express.json())

app.use('/api/fruits', fruitsRouter)


app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})