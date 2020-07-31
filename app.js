const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./models');



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 14*24*60*60*1000}
}))

//routes

app.use(require('./routes/index'))
app.use(require('./routes/login'))
app.use(require('./routes/albums'))



app.listen(3000, () => {
    console.log(`listening on port 3000`);
})