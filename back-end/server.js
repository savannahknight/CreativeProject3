const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const argon2 = require("argon2");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

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

// connect to the database
mongoose.connect('mongodb://localhost:27017/playlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));
//salt and hash the password first.
userSchema.pre('save', async function(next) {
  if (!this.isModified('password'))
    return next();

  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model('User', userSchema);

const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    req.user = user;
  } catch (error) {
    return res.status(403).send({
      message: "not logged in"
    });
  }
  next();
};

//register a user
app.post('/api/users', async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.name)
    return res.status(400).send({
      message: "name, username and password are required"
    });
    try {
      const existingUser = await User.findOne({
        username: req.body.username
      });
      if (existingUser)
        return res.status(403).send({
          message: "username already exists"
        });
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        // name: "",
        email: "",
        phone: "",
        work: "",
        city: "",
        state: "",
        image: "",
      });
      await user.save();
      req.session.userID = user._id;
      return res.send({
        user: user
      });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//login a user
app.post('/api/users/login', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "username and password are required"
    });
    try {
      const user = await User.findOne({
        username: req.body.username
      });
      if (!user)
        return res.status(403).send({
          message: "username or password is wrong"
        });
      if (!await user.comparePassword(req.body.password))
        return res.status(403).send({
          message: "username or password is wrong"
        });
      req.session.userID = user._id;

      return res.send({
        user: user
      });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
//get logged in user
app.get('/api/users', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
//logout a user
app.delete('/api/users/logout', validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
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
app.delete('/api/users', validUser, async (req, res) =>{
  try {
    await User.deleteOne({
      _id: req.user._id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
//Edit profile info
app.put('/api/users', validUser, async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.user._id
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
app.put('/api/photos', validUser, async (req, res) => {
  try {
    console.log(req.params.userID)
    console.log(req.body.image)
    let user = await User.findOne({
      _id: req.user._id
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
  created: {
    type: Date,
    // default: Date.now
  },
  year: String,
  artist: String,
  genre: String,
});

const Playlist = mongoose.model('Playlist', playlistSchema);
app.post('/api/users/songs', validUser, async (req, res) => {
    console.log(req.user);
    try {
        let user = await User.findOne({_id: req.user._id});
        console.log(user);
        if (!user) {
            res.sendStatus(404);
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
app.get('/api/users/songs', validUser, async (req, res) => {
  try {
    let user = await User.findOne({_id: req.user._id});
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
app.put('/api/users/songs/:songID', validUser, async (req, res) =>{
  try{
    let song = await Playlist.findOne({
      _id: req.params.songID,
    });
    if (!song) {
        res.send(404);
        return;
    }
    song.created = Date.now();
    song.amountPlayed += 1;
    console.log(song.amountPlayed);
    await song.save();
    res.send(song);
  } catch(error) {
    res.sendStatus(500);
  }
});
app.delete('/api/users/songs/:songID', validUser, async (req, res) =>{
  try {
    let song = await Playlist.findOne({
      _id: req.params.songID,
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

app.listen(3001, () => console.log('Server listening on port 3001!'));
