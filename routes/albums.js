const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/albums',(req,res) => {
    res.render('albums', {
        pageID: "Albums",
        username: req.session.username,
        userID: req.session.userID
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
    
    // console.log(userID, review, rating, albumID, albumTitle, aristName, albumURL)

    console.log(`userID: ${userID}, review: ${review}, rating: ${rating}, albumID: ${albumID}`);

    db.reviews.create({
        authorID: userID,
        stars: rating,
        text: review,
        albumID: albumID,
        aristName: aristName,
        albumURL: albumURL,
        albumTitle: albumTitle

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