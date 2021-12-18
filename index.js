const express = require('express')
const app = express()
const path = require('path')

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

app.get('/*', (req,res) => {
    res.render('error', {

    })
})

app.listen(port, () => console.log('Server is up on port ', port))