const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/albums',(req,res) => {
    let rating = parseInt(req.body.rating);
    res.render('albums', {
        pageID: "Albums",
        username: req.session.username,
        userID: req.session.userID,
        stars:rating
    });
})

router.post('/albums', async (req, res) => {
    // let username = req.session.username;
    let userID = parseInt(req.session.userID)
    let review = req.body.reviewText
    let rating = parseInt(req.body.rating)
    let albumID = req.body.albumID
    let albumTitle = req.body.albumName;
    let aristName = req.body.artistName;
    let albumURL = req.body.albumArt;

  
    console.log(`userID: ${userID}, review: ${review}, rating: ${rating}, albumID: ${albumID}`);

    db.reviews.create({
        authorID: userID,
        stars: rating,
        text: review,
        albumID: albumID,
        aristName: aristName,
        albumTitle: albumTitle,
        albumURL: albumURL

    })
    .then(user =>{
        console.log("review inserted succesfully")
        res.redirect('/')
    })
    .catch(error =>{
        console.log(error)
    })
})




module.exports = router;