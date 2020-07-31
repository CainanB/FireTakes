const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');



router.post('/registration', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let passwordEncrypted = bcrypt.hashSync(password, 8)

    db.users.create({
        username: username,
        password: passwordEncrypted
    })
    .then(user =>{
        res.redirect('/login')
    })
    .catch(error =>{
        console.log(error)
    })
})



module.exports = router