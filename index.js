var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressLayouts = require('express-ejs-layouts');
//const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var flash = require('connect-flash');
const router = express.Router();
require('dotenv').config();


var frontendRoutes = require('./src/routes/frontendRoutes.routes');
var studentroutes = require('./src/routes/studentroutes');
var companyroutes = require('./src/routes/companyroutes');
const { hash } = require('bcrypt');


// create express app
const app = express();

//app.use(express.bodyParser);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload(
    __dirname = "C:\Users\Hp\Desktop\interns-hub\public\pdf"
));
//setup the server port
const port = process.env.PORT;

app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'user',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    res.locals.user = req.session.user;
    res.locals.usertype1 = req.session.usertype1;
    res.locals.usertype2 = req.session.usertype2;
    next();
});


app.use(flash());


app.locals.baseURL = `https://interns-hub.herokuapp.com/:${PORT}`;

//For Static Files 
app.use(express.static('public'))

//Set Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/homepage2')


//app.set('views','views')
app.set('view engine', 'ejs')


// using project routes
app.use('/', frontendRoutes);
app.use('/student', studentroutes);
app.use('/company', companyroutes);


// listen to the port
app.listen(process.env.PORT || 5000, () => {
    console.log("The server is now running on port ", process.env.PORT)
})
