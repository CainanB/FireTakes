const express = require('express');
const router = express.Router();

router.get('/artists',(req,res) => {
    res.render('artists', {
        pageID: "Artists"
    });
})


module.exports = router;