const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Db connected')
}).catch(err => {
    console.log('Unable to connect to DB' + err)
})