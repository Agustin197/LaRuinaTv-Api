require('dotenv').config();
const { aliasTest, emailTest, passwordTest } = process.env

const express = require('express')
const server = express.Router()





//-------------------user---------------------

server.get('/all)', (req, res) => {
    const { alias, email, password } = req.body
    if (alias === aliasTest && email === emailTest && password === passwordTest) {
        return res.status(200).send(`Accion realizada correctamente`) //test
    } else return res.status(400).send('error')

})

server.post('/payment)', (req, res) => {
    const { alias, email, password } = req.body
    if (alias === aliasTest && email === emailTest && password === passwordTest) {
        return res.status(200).send(`Transaccion realizada correctamente`) //test
    } else return res.status(400).send('error')

})


server.post('/addcart/:id:number(buscar opcion por query)', (req, res) => {
    const { alias, email, password } = req.body
    const { id } = req.params
    // const { user } = req.body
    if (alias === aliasTest && email === emailTest && password === passwordTest) {
        return res.status(200).send(` "${id}" al carrito`) //test
    } else return res.status(400).send('error')
})

server.post('/deletecart/:id', (req, res) => {
    const { alias, email, password } = req.body
    const { id } = req.params
    if (alias === aliasTest && email === emailTest && password === passwordTest) {
        return res.status(200).send(`"${id}" eliminado correctamente`) //test
    } else return res.status(400).send('error')
})


//-----------------admin------------------

server.post('/addproduct/:id:number(buscar opcion por query)', (req, res) => {
    const { id } = req.params
    const { user } = req.body
    if (alias === aliasTest && email === emailTest && password === passwordTest) {
        return res.status(200).send(`"${id}" publicado correctamente`) //test
    } else return res.status(400).send('error')
})

server.post('/deleteproduct/:id', (req, res) => {
    const { alias, email, password } = req.body
    const { id } = req.params
    if (alias === aliasTest && email === emailTest && password === passwordTest) {
        return res.status(200).send(`"${id}" eliminado correctamente`) //test
    } else return res.status(400).send('error')
})