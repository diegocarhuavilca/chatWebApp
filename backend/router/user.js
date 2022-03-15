
var express = require('express')
var router = express.Router()

router.route('/login').post(function(req,res){
    res.json({
        message:'login ok'
    })
})

router.route('/register').post(function(req,res){
    res.json({
        message:'register ok'
    })
})


module.exports = router