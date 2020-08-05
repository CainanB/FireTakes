const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models')


router.get('/login',(req,res) => {
    res.render('login', {
        pageID: "Login"
    });
});


router.post('/logout', (req,res) => {
    // res.send(`${req.session.username} logged out.`)
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', async (req, res) => {
    
    try {
        let username = req.body.username;
        let password = req.body.password;
        // console.log(username, password);
        let results = await db.users.findAll(
            {where: {username: username}})
        // results is an array of objects from db
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, response)=>{

                if (response) {
                    // console.log("it worked!")
                    // console.log(results[0].id)
                    req.session.username = username
                    req.session.userID = results[0].id
                    if(results[0].profileImage){
                        req.session.hasProfilePhoto = 'true'
                        req.session.profilePhotoPath = results[0].profileImage
                    }else{
                        req.session.hasProfilePhoto = 'false'
                    }
                    // console.log(req.session.username)
                    // console.log(req.session.userID)
                    res.json('success')
                }
                else {
                    res.json('Incorrect username or password')
                    // console.log(err)
                }
            })
        }
    }
    catch {
        console.log("Something went wrong in the try/catch")
    }
})

module.exports = router;