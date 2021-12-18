const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const config = require('config');
const dbConfig = config.get('BeautifulSoup.dbConfig.db')
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, './views')

const imagesDirectory = path.join(__dirname, '/images')
const publicDirectory = path.join(__dirname, '/public')

app.use(express.static(imagesDirectory))
app.use(express.static(publicDirectory))

app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', viewsPath)

mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => {
    console.log('Unable to connect to DB' + err)
})

app.get('/main', (req,res) => {
    res.render('main', {

    })
})

app.get('/catalog', (req,res) => {
    res.render('catalog', {

    })
})


app.get('/*', (req,res) => {
    res.render('error', {

    })
})

app.listen(port, () => console.log('Server is up on port ', port))