const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const bodyparser = require('body-parser')
app.use(bodyparser.json())
notesrouter = require('./routes/notesroute')

app.get('/', (req, res) => {
    return res.send("not a valid request, better luck next time")
})
app.use('/notes/', notesrouter)
PORT = process.env.PORT || 3000
app.listen(3000, () => {
    console.log('listening to port number ', 3000)
})