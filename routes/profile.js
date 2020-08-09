
const express = require('express');
const router = express.Router();
const db = require('../models');


// /profile/:id to grab a specific user page. id is unique primary key in the database
router.get('/profile',(req,res) => {
    if(!req.session.username){
        res.redirect('/')
    }else{
            
        res.render('profile', {
            pageID: "My Profile",
            username: req.session.username,
            hasProfilePhoto: req.session.hasProfilePhoto,
            userID: req.session.userID
        });
    }

});


router.get('/userInfo', (req, res) =>{
    
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
        let id = results[r].dataValues.id;
        
        
        let newreview = {
            "text": text,
            "albumID": albumID,
            "stars": stars,
            "aristName": aristName,
            "albumURL": albumURL,
            "albumTitle": albumTitle,
            "id": id
           
        }
        myreviews.push(newreview)
        // console.log(myreviews);
    };
    res.json(myreviews);
 
})
.catch(err =>{
    res.send(err)
})

})

router.post('/updateReview', (req, res) => {
    console.log(req.body)
    // albumID: '22',
    // editedReviewText: 'now is cool'

            db.reviews.update({
            text: req.body.editedReviewText
        },{
            where:{
                id: req.body.albumID
            }
        })
        .then(updatedRecord =>{
            res.json("success")
        })

})

router.post('/deleteReview', (req, res) => {
    console.log(req.body)
   
            db.reviews.destroy({
                where:{
                    id: req.body.albumID
                }
            })
        .then(rowDeleted =>{
            if(rowDeleted == 1){
                res.json("success")
            }
            
        })

})
router.post('/deleteAccount', (req, res) => {
    console.log(req.session.userID);
            db.reviews.destroy({
                where:{
                    authorID: req.body.userID
                }
            })
        .then(rowDeleted =>{
            db.users.destroy({
                where:{
                    id: req.body.userID
                }
            }).then(userDeleted =>{
                console.log(`user ${req.body.userID} has been deleted`);
                req.session.destroy();
                res.json("success")
                
                // res.redirect('/');
                
            })

            // res.json("success")
        })

})


module.exports = router;


