const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) =>{
        res.render('maintainance.hbs', {
        
    });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
        
        res.render('home.hbs', {
            pageTitle: 'Home Page',
            message: 'Welcome to your Home Page.',
        });
});

app.get('/about', (req,res) => {
    // res.send('Welcome to About Page.');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: 'This web page contains error.',
        errorMessage: 'unable to fullfill the request.'
    })
});
app.listen(3000, () =>{
    console.log('server is up on 3000.');
});
