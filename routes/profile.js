
const express = require('express');
const router = express.Router();
const db = require('../models');


// /profile/:id to grab a specific user page. id is unique primary key in the database
router.get('/profile',(req,res) => {
    if(!req.session.username){
        res.redirect('/')
    }else{
            // console.log(req.session.userID)
            db.reviews.findAll({where: {authorID: req.session.userID}})
            // results in an array of objects from db
            .then(results =>{
            let myreviews = []

            for (let r = 0; r < results.length; r++) {

                let text = results[r].dataValues.text;
                let albumID = results[r].dataValues.albumID;
                let stars = results[r].dataValues.stars;
                let aristName = results[r].dataValues.aristName;
                let albumURL = results[r].dataValues.albumURL;
                let albumTitle = results[r].dataValues.albumTitle;
                
                
                let newreview = {
                    "text": text,
                    "albumID": albumID,
                    "stars": stars,
                    "aristName": aristName,
                    "albumURL": albumURL,
                    "albumTitle": albumTitle
                    // "imageURL": XXXXXXXX,
                    // "albumName": XXXXXXX,
                    // "artistName": XXXXXXX
                }
                myreviews.push(newreview)
            };

            res.render('profile', {
                pageID: "My Profile",
                username: req.session.username,
                myreviews: myreviews,
                hasProfilePhoto: req.session.hasProfilePhoto
            });
        })
        .catch(err =>{
            res.send(err)
        })
    }

});


// router.get('/profile', (req, res) =>{
    
// })


module.exports = router;