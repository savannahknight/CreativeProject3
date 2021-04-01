const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/playlist', {
  useNewUrlParser: true
});
const multer = require('multer')
const upload = multer({
  dest: '../front-end/images/',
  limits: {
    fileSize: 10000000
  }
});

const itemSchema = new mongoose.Schema({
  username: String,
  password: String,
  path: String,
  profile: String,
});
const Item = mongoose.model('Item', itemSchema);

app.listen(3000, () => console.log('Server listening on port 3000!'));
