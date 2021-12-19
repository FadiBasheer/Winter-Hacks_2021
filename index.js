const express = require('express')
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
  
var upload = multer({ storage: storage });
var imgModel = require('./models/card');



// Parse URL-encoded bodies
app.use(express.urlencoded()); 
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', viewsPath)



// Main Page
app.get('/main', (req,res) => {
    res.render('main', {

    })
})

// Catalog Page
app.get('/catalog', (req,res) => {
    imgModel.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('catalog', { images });
            
            images.forEach((image) => {
                
                console.log(image.createdAt);
            })
        }
    });
})

// Register Page
app.get('/register', (req,res) => {
    res.render('register', {

    })
})

// Login Page
app.get('/', (req,res) => {
    res.render('login', {

    })
})

// Login Page
app.get('/login', (req,res) => {
    res.render('login', {

    })
})

// Upload Page
app.get('/upload', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('upload', { items: items });
        }
    });
});

// 404 Page
app.get('/*', (req,res) => {
    res.render('error', {

    })
})

// Create new user, save new user in database
app.post('/users', async (req, res) => {
    const user = new User(req.body)

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
        }
        else {
            // console.log(req.file);
            // item.save();
            res.redirect('/catalog');
        }
    });
});



app.listen(port, () => console.log('Server is up on port ', port))