const express = require('express')
const { getAdventures } = require('../../../controllers/app/wog/getAdventures')
const router = express.Router()

router.get('/', (req,res)=>{
    let adventures = getAdventures()
    return res.status(200).send(adventures)
})

module.exports = router