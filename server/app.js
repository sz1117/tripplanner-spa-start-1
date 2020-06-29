const path = require('path');
const express = require('express');
const morgan = require("morgan");
const app = express();

const routes = require('./routes/api.js')

// logging and body-parsing
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// You'll of course want static middleware so your browser can request things
// like your 'index.html' and 'bundle.js'.
app.use(express.static(path.join(__dirname, '..', 'public')));

// other routes go below
app.use('/api', routes)


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send(
    "Something went wrong: " + err.message
  );
});

const PORT = 3000;

const init = async function() {
  //await db.sync()
  app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();
