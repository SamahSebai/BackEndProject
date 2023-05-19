const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const DemandeSchema = new Schema(
    {
       
       alumni: {
            type: Schema.Types.ObjectId,
            ref: "Compte",
        },
        type: {
            type: String,
        },
        
        compétences: {
            type: String,
         
        },
    },
    {
        timestamps : true , versionKey : false
    }
);

module.exports =
    mongoose.models.Demande|| mongoose.model('Demande', DemandeSchema);
