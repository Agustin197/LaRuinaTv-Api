const { DB_LARUINATV_PRODUCTS } = require("../misc/product.js");
const express = require('express')
const server = express.Router()
const { getProductById } = require("../controllers/product.js");


//-------------------Products---------------------

server.get('/all', (req, res) => {
    try {
        return res.status(200).send(DB_LARUINATV_PRODUCTS) //test
    } catch (error) {
        return res.status(400).send('error')
    }
})
server.get('/:id', (req, res) => {
    let {id} = req.params
    try {
        return res.status(200).send(getProductById(id)) //test
    } catch (error) {
        return res.status(400).send('error')
    }
})
>>>>>>> 21e26b974ecc4b61937f3fbb46177fa7858832e7

//-------------------user---------------------

<<<<<<< HEAD
server.get('/all', (req, res) => {
    try {
        return res.status(200).send(DB_LARUINATV_PRODUCTS) //test
    } catch (error) {
        return res.status(400).send('error')
    }
})

server.get('/payment', (req, res) => {
=======
// server.get('/all', (req, res) => {
//     try {
//         return res.status(200).send(DB_LARUINATV_PRODUCTS) //test
//     } catch (error) {
//         return res.status(400).send('error')
//     }
// })
// server.get('/payment', (req, res) => {
>>>>>>> 21e26b974ecc4b61937f3fbb46177fa7858832e7
   
    try {
        return res.status(200).send(`transacción realizada correctamente`) //test

    } catch (error) {
        return res.status(400).send('error')
    }
})





module.exports = server; 