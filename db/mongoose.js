const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://toni:op4znLRryDM8okHt@cluster0.ldzkt.mongodb.net/ApplicationDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => {
    console.log('Unable to connect to DB' + err)
})