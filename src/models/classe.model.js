const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classeSchema = new Schema({
    classe: {
        type:String,
        required : true
    },
    lmd_type: {
        type:String,
        required : true
    }
});

module.exports = mongoose.model('classe', classeSchema, 'classes');