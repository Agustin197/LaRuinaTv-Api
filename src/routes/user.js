require('dotenv').config();
const { aliasTest, emailTest, passwordTest} = process.env

const express = require('express')
const server = express.Router()

/* -------------Account------------- */
server.post('/createaccount', async (req,res,next)=>{
    const { alias, email, password } = req.body
    if(alias === aliasTest && email === emailTest && password === passwordTest)
        return res.status(200).send('create account: success') //test
    else return res.status(400).send('error')
})

server.post('/deleteaccount', async (req,res,next)=>{
    const { alias, email, password } = req.body
    if(alias === aliasTest && email === emailTest && password === passwordTest){
        return res.status(200).send('delete account: success') //test
        
    } else return res.status(400).send('error')
})

server.post('/login',(req,res,next)=>{
    const { alias, email, password } = req.body
    if(alias === aliasTest && email === emailTest && password === passwordTest){
        return res.status(200).send('login: success') //test
    } else return res.status(400).send('error')
})

server.post('/logout', (req,res)=>{
    const { alias, email, password } = req.body
    if(alias === aliasTest && email === emailTest && password === passwordTest){
        return res.status(200).send('logout: success') //test
    } else return res.status(400).send('error')
})

/* ---------ProfileSettings--------- */
server.get('/profile', (req,res)=>{
    if(req.route.path === '/profile'){
        return res.status(200).send('profile: success') //test
    } else return res.status(400).send('error')
})

server.post('/addfavorite/:id', (req,res)=>{
    const { alias, email, password } = req.body
    const { id } = req.params
    if(alias === aliasTest && email === emailTest && password === passwordTest){
        return res.status(200).send(`agregar "${id}" a los favoritos de usuario "${alias}": success`) //test
    } else return res.status(400).send('error')
})

server.post('/deletefavorite/:id', (req,res)=>{
    const { alias, email, password } = req.body
    const { id } = req.params
    if(alias === aliasTest && email === emailTest && password === passwordTest){
        return res.status(200).send(`eliminar "${id}" de los favoritos de usuario "${alias}": success`) //test
    } else return res.status(400).send('error')
})

module.exports = {server}