const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to write log');
    };
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Good to see you'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Good to see you'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'error'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
