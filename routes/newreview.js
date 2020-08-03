const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const db = require('../models');

router.post('/newreview', (req, res) => {
    // declare info here
    let authorID = req.body.authorID;
    let stars = req.body.stars;
    let text = req.body.text;
    let albumID = req.body.albumID;
    console.log(authorID, stars, text, albumID);

    // let passwordEncrypted = bcrypt.hashSync(password, 8)

    db.reviews.create({
        // add info here
        authorID: authorID,
        stars: stars,
        text: text,
        albumID: albumID
    })
    .then(user =>{
        console.log("new review saved!")
        res.redirect('/')
    })
    .catch(error =>{
        console.log(error)
    })
    // res.send('Done')
})



module.exports = router