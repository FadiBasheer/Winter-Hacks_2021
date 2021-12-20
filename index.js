const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const User = require('./models/user.js')

var fs = require('fs');
var mongoose = require('mongoose')

require('./db/mongoose.js')

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, './views')
const imagesDirectory = path.join(__dirname, '/images')
const publicDirectory = path.join(__dirname, '/public')

app.use(express.static(imagesDirectory))
app.use(express.static(publicDirectory))

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    storage: storage
});
var imgModel = require('./models/card');

// Parse URL-encoded bodies
app.use(express.urlencoded());
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', viewsPath)

app.use(session({
    secret: 'extra text that no one will guess',
    name: 'wazaSessionID',
    resave: false,
    saveUninitialized: true
}));

const auth = async (req, res, next) => {
    if (req.session.loggedIn === true) {

        next()
        return
    }
    res.redirect("/login")
}

// Main Page
app.get('/main', auth, (req, res) => {
    res.render('main', {

    })
})

// Catalog Page
app.get('/catalog', auth, (req, res) => {
    imgModel.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('catalog', {
                images
            });
        }
    });
})

// Register Page
app.get('/register', (req, res) => {
    res.render('register', {

    })
})

// Login Page
app.get('/', (req, res) => {
    res.render('login', {

    })
})

// Login Page
app.get('/login', (req, res) => {
    res.render('login', {

    })
})


app.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.psw)
        req.session.loggedIn = true;
        req.session.email = req.body.email;
        req.session.save(function (err) {
            // session saved
            console.log("session saved");
        })
        res.redirect('/main');
    } catch (error) {
        res.status(400).render('error', {
            error
        });
    }
})

app.get('/logout', function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.log(error);
        }
    });
    res.redirect("/login");
})

// Upload Page
app.get('/upload', auth, (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        } else {
            res.render('upload', {
                items: items
            });
        }
    });
});

// 404 Page
app.get('/*', (req, res) => {
    res.render('error', {

    })
})

// Create new user, save new user in database
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    console.log(req);
    try {
        await user.save()
        res.status(201).send({
            user
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// save new card in database
app.post('/upload', upload.single('card'), (req, res, next) => {
    console.log(req);
    var obj = {
        card: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(req.file);
            // item.save();
            res.redirect('/catalog');
        }
    });
});

app.listen(port, () => console.log('Server is up on port ', port))