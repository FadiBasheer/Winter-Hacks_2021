const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    card:
    {
        data: Buffer,
        contentType: String,
    }
}, {
    timestamps: true
});

//Image is a model which has a schema imageSchema
module.exports = new mongoose.model('Card', cardSchema);
