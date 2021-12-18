const express = require('express')
const app = express()
const path = require('path')
const User = require('./models/user.js')

require('./db/mongoose.js')

const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, './views')

const imagesDirectory = path.join(__dirname, '/images')
const publicDirectory = path.join(__dirname, '/public')

app.use(express.static(imagesDirectory))
app.use(express.static(publicDirectory))

app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', viewsPath)


//Main Page
app.get('/main', (req,res) => {
    res.render('main', {

    })
})

//Catalog Page
app.get('/catalog', (req,res) => {
    res.render('catalog', {

    })
})

//Register Page
app.get('/register', (req,res) => {
    res.render('register', {

    })
})

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

app.get('/*', (req,res) => {
    res.render('error', {

    })
})




app.listen(port, () => console.log('Server is up on port ', port))