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
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  image: String,
  name: String,
  email: String,
  phone: String,
  work: String,
  city: String,
  state: String,
});
const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    name: "",
    email: "",
    phone: "",
    work: "",
    city: "",
    state: "",
    image: "",
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
app.get('/api/users/:id', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// const profileSchema = new mongoose.Schema ({
//   user: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User'
//   },
//   image: String,
//   name: String,
//   email: String,
//   phone: String,
//   work: String,
//   city: String,
//   state: String,
// });

// const Profile = mongoose.model('Profile', profileSchema);
// //create profile information
// app.post('/api/profile', async (req, res) => {
//   const profile = new Profile({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     work: req.body.work,
//     city: req.body.city,
//     state: req.body.state,
//     image: req.body.image,
//   });
//   try {
//     await profile.save();
//     res.send(profile);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });
//upload a profile picture
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    image: "/images/" + req.file.filename
  });
});
//Delete a users account
app.delete('/api/users/:userID', async (req, res) =>{
  try {
    await User.deleteOne({
      _id: req.params.userID
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
//Edit profile info
app.put('/api/users/:userID', async (req, res) => {
  try {
    console.log(req.params.userID)
    let user = await User.findOne({
      _id: req.params.userID
    });
    user.name = req.body.name,
    user.email = req.body.email,
    user.phone = req.body.phone,
    user.work = req.body.work,
    user.city = req.body.city,
    user.state = req.body.state,
    await user.save();
    console.log(user)
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.put('/api/photos/:userID', async (req, res) => {
  try {
    console.log(req.params.userID)
    console.log(req.body.image)
    let user = await User.findOne({
      _id: req.params.userID
    });
    user.image = req.body.image,
    await user.save();
    console.log(user)
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const playlistSchema = new mongoose.Schema ({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //path to the song from SongList.vue
  name: String,
  image: String,
  amountPlayed: {type:Number, default:0},
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
app.put('/api/users/:userID/songs/:songID', async (req, res) =>{
  try{
    let song = await Playlist.findOne({
      _id: req.params.songID,
      user: req.params.userID,
    });
    if (!song) {
        res.send(404);
        return;
    }
    song.amountPlayed += 1;
    console.log(song.amountPlayed);
    await song.save();
    res.send(song);
  } catch(error) {
    res.sendStatus(500);
  }
});
app.delete('/api/users/:userID/songs/:songID', async (req, res) =>{
  try {
    let song = await Playlist.findOne({
      _id: req.params.songID,
      user: req.params.userID,
    });
    if (!song) {
        res.send(404);
        return;
    }
    await song.delete();
    res.sendStatus(200);
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
