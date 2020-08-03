
const express = require('express');
const router = express.Router();

// /profile/:id to grab a specific user page. id is unique primary key in the database
router.get('/profile',(req,res) => {
    res.render('profile', {
        pageID: "My Profile"
    });
});


module.exports = router;