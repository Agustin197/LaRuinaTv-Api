const express = require('express')
const router = express.Router()
const { getTales } = require('../../../controllers/app/wog/getTales')

router.get('/', (req,res)=>{
    let tales = getTales()
    return res.status(200).send(tales)
})

module.exports = router