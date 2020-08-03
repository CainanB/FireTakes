
const express = require('express');
const router = express.Router();
const db = require('../models');

// /profile/:id to grab a specific user page. id is unique primary key in the database
router.get('/profile',(req,res) => {

    // console.log(req.session.userID)
    db.reviews.findAll({where: {authorID: req.session.userID}})
        // results in an array of objects from db
    .then(results =>{
        let myreviews = []

        for (let r = 0; r < results.length; r++) {

            let text = results[r].dataValues.text;
            let albumID = results[r].dataValues.albumID;
            let stars = results[r].dataValues.stars;
            
            let newreview = {
                "text": text,
                "albumID": albumID,
                "stars": stars
            }
            
            myreviews.push(newreview)
        
        };
        
        res.render('profile', {
            pageID: "My Profile",
            myreviews: myreviews
        });
    })
    .catch(err =>{
        res.send(err)
    })


    
});


module.exports = router;