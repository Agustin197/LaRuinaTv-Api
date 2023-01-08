require("dotenv").config()
const { aliasTest, emailTest, passwordTest } = process.env

const express = require('express')
const server = express.Router()





//-------------------user---------------------

server.get('/all', (req, res) => {
  
    try {
        return res.status(200).send(`Accion realizada correctamente`) //test

    } catch (error) {
        return res.status(400).send('error')
    }
})

server.get('/payment', (req, res) => {
   
    try {
        return res.status(200).send(`transacción realizada correctamente`) //test

    } catch (error) {
        return res.status(400).send('error')
    }
})





module.exports = server; 