const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 8080;

/// helper functions
const { getUserObjectById } =require('./helpers/helpers');


//////////////////////////////////////////////////////
/// Connect To Database
//////////////////////////////////////////////////////
mongoose.Promise =global.Promise;
mongoose.connect(' mongodb://127.0.0.1:27017/forum')
    .then(db => console.log('MongoDb Connected'))
    .catch(err => console.log(Error(err)));


//////////////////////////////////////////////////////
/// Setup View Engine
//////////////////////////////////////////////////////
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials',
    helpers: { 
        getUserObjectById: getUserObjectById
     }
}));
app.set('view engine', 'hbs');




//////////////////////////////////////////////////////
/// Middlewares
//////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(cookieParser());

app.use(fileUpload());

app.use(methodOverride('_method'));

app.use(express.static(__dirname+'/public'));

const is_auth =require('./middlewares/is_auth');
const is_admin =require('./middlewares/is_admin');


//////////////////////////////////////////////////////
/// Routes
//////////////////////////////////////////////////////
const public_routes =require('./routes/front');
const admin_routes =require('./routes/dashboard');

app.use('/', public_routes);
app.use('/admin', admin_routes);



//////////////////////////////////////////////////////
/// Listen For Server
//////////////////////////////////////////////////////
app.listen(PORT, (err) => {
    if(err) console.log(err);

    console.log(`Your Server Is Running On Port ${PORT}`);
});