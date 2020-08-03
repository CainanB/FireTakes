const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
// const db = require('./models');



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 14*24*60*60*1000}
}))

app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/artists'))
app.use(require('./routes/login'))
// app.use(require('./routes/profile'))
// app.use(require('./routes/review'))
app.use(require('./routes/registration'))
app.use(require('./routes/login'))


app.listen(4000, () => {
    console.log(`listening on port 4000`);
})