const config = require('config');
const dbConfig = config.get('BeautifulSoup.dbConfig.db')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://toni:op4znLRryDM8okHt@cluster0.ldzkt.mongodb.net/ApplicationDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => {
    console.log('Unable to connect to DB' + err)
})