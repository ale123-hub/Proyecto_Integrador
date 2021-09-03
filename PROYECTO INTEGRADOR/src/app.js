const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');

const { database } = require('./keys');


const app = express();
require('./lib/passport');

/// archivos compartidos
app.set('port', process.env.PORT || 4000); 
app.set('views', path.join(__dirname, 'vistas'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), 
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs',
    helpres: require('./lib/handlebars')
})); 
app.set('view engine', '.hbs');
/// archivos compartidos


//midlewars 
app.use(morgan('dev')); 
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(session({
    secret: 'seguimiento',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//midlewars

//varible globales 
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});
//varible globales 

//public
app.use(express.static(path.join(__dirname, 'public')));
//public


//routers
app.use(require('./rutas/index.rutas'))
app.use(require('./rutas/registro'))
app.use(require('./rutas/usuario'))  
app.use('/Seguimiento', require('./rutas/seguimientos.rutas'))
app.use('/Etapas', require('./rutas/etapas.rutas'))
app.use('/Actividades', require('./rutas/actividades.rutas'))
app.use('/Etapa_persona', require('./rutas/etapa_personas.rutas'))
app.use('/Planificacion_actividades', require('./rutas/planficacion_actividades.rutas'))

module.exports = app; 