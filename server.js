const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }

    });
    next();
});

// app.use((req, res, next) =>{
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'What it do MuthaFucka! Welcome to my shit! Bet ya cant do it like me!',

});
});

app.get('/about', (req,res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
});
});

app.get('/projects', (req,res) =>{
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        portfolioMessage: 'Portfolio page here',
    });
});

app.get('/bad', (req, res) =>{
    res.send({
    name: 'Big Boi',
    favFoods: [
        'Chicken Tikka Masala',
        'Simosas',
        'Pussy'
    ],
    errorMessage: 'This shit aint workin bruh...'
});
});

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});