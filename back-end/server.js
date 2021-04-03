const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/playlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const multer = require('multer')
const upload = multer({
  dest: '../front-end/images/',
  limits: {
    fileSize: 10000000
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
const profileSchema = new mongoose.Schema ({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  fullName: String,
  email: String,
  phone: String,
  address: String,
  path: String,
});

const Profile = mongoose.model('Profile', profileSchema);

const playlistSchema = new mongoose.Schema ({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //path to the song from SongList.vue
  name: String,
  image: String,
  year: String,
  artist: String,
  genre: String,
});

const Playlist = mongoose.model('Playlist', playlistSchema);
app.post('/api/users/:userID/songs', async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userID});
        if (!user) {
            res.send(404);
            return;
        }
        let playlist = new Playlist({
            user: user,
            name: req.body.name,
            image: req.body.image,
            year: req.body.year,
            artist: req.body.artist,
            genre: req.body.genre,
        });
        await playlist.save();
        console.log(playlist);
        res.send(playlist);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.get('/api/users/:userID/songs', async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    if (!user) {
        res.send(404);
        return;
    }
    let playlist = await Playlist.find({
      user: user
    })
    res.send(playlist);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// app.post('/api/users/:userID/songs', async (req, res) => {
//     try {
//         let playlist = await Project.findOne({_id: req.params.userID});
//         if (!playlist) {
//             res.send(404);
//             return;
//         }
//         let profile = new Profile({
//             user: user,
//             fullName: req.body.fullName,
//             email: req.body.email,
//             phone: req.body.phone,
//             address: req.body.address,
//             path: req.body.path,
//         });
//         await item.save();
//         res.send(profile);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

app.listen(3000, () => console.log('Server listening on port 3000!'));
