
const express = require('express');
const router = express.Router();
const db = require('../models');
// const axios = require('axios');
// const btoa = require('btoa');

const APIkeys = {
    clientId :'73189585c28c4d4e93e7db8ec63f156f',
    clientSecret : 'a2e470f4466f4f9889aa510a35e55f12'
}
const clientId = APIkeys.clientId;
const clientSecret = APIkeys.clientSecret;


const getToken = async () => {
    const result = await axios.get('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result;
    // console.log(data.access_token);
    return data.access_token;
}

const getAlbumInfo = async (albumID) => {
    const result = await axios.get(`https://api.spotify.com/v1/albums/${albumID}?market=ES&limit=20&offset=0`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + await getToken()}
    });
    const albumData = await result;
    // console.log(albumData);
    return albumData;
} 

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
            myreviews: myreviews
        });
    })
    .catch(err =>{
        res.send(err)
    })
});


// router.get('/profile', (req, res) =>{
    
// })


module.exports = router;