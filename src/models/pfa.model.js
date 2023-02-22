const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pfa = new Schema({
    title: {
        type:String
    },
    description: {
        type:String
    },
    date: {
        type: Date,
        default: new Date()
    },
    createdBy:{type: Schema.Types.ObjectId, ref: 'personnel'},
    // validatedBy:
});

module.exports = mongoose.model('pfa', pfa, 'pfas');
