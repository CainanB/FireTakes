const express = require('express');
const router = express.Router();
const db = require('../models')

router.post('/albumSpecificReviews',(req,res) => {
    let albumID = req.body.albumID
    console.log(albumID);


    db.reviews.findAll({
        where: {albumID: albumID},    
        include: [{model: db.users
        //where: {id: }
        }]})
        .then(results =>{
            //console.log(results[0].users.username);
            let reviews = [];
            results.forEach(review =>{
                //console.log(review);
                reviews.push({
                    username:review.user.username,
                    reviewText: review.text,
                    stars: review.stars
                })
                console.log(`${review.user.username} ${review.text}`);
            })
            console.log(reviews);
            res.json(reviews)
        })
})


module.exports = router;