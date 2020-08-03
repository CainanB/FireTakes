const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models')


router.get('/login',(req,res) => {

    res.render('login', {

        pageID: "Login"
    });
})

router.post('/login', async (req, res) => {
    
    try {
        let username = req.body.username;
        let password = req.body.password;

        let results = await db.users.findAll({where: {username: username}})
        // results is an array of objects from db
        if (results.length > 0) {

            bcrypt.compare(password, results[0].password, (err, response)=>{

                if (response) {
                    console.log("it worked!")
                    req.session.username = username
                    console.log(req.session.username)
                    res.redirect('/')
                }
                else {
                    console.log(err)
                }
            })
        }
    }
    catch {
        console.log("Something went wrong in the try/catch")
    }
})

module.exports = router;