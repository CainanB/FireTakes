const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/profilephotos'});
const db = require('../models')
const path = require("path");
const fs = require("fs");

router.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        //res.json(req.file);
        // console.log(req.file);
        db.users.update({
            profileImage: req.file.filename
          },
          {
            where: {
                id: parseInt(req.session.userID)
            }
          })
          .then(updatedRecord=>{
            // console.log(updatedRecord);
            req.session.hasProfilePhoto = "true"
            res.redirect('/profile')
          })

    }
    else throw 'error';
});
// router.get('/uploadTest',(req,res) => {

//     res.render('uploadTest',{
//         hasProfilePhoto: req.session.hasProfilePhoto
//     })
// })

router.get('/image', (req,res) => {
    db.users.findOne(
      {
        where: {
            id: parseInt(req.session.userID)
        }
      })
      .then(user =>{
        // console.log(user.profileImage);
        res.sendFile(path.join(__dirname, `./uploads/profilephotos/${user.profileImage}`));
      })
    
})

module.exports = router;