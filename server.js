const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path = require('path')
const request = require('request');
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)
app.listen(port, function(){
    console.log("server is running on "+ port)
})