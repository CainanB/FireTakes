const express = require('express');
const router = express.Router();

router.get('/albums',(req,res) => {
    res.render('albums');
})


module.exports = router;