const express = require('express')
const app = express()
const mongoose = require('mongoose')

const config = require('config');
const dbConfig = config.get('BeautifulSoup.dbConfig.db')

mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => {
    console.log('Unable to connect to DB' + err)
})


