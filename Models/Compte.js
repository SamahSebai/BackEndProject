const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const AccountSchema = new Schema(
    {
        firstName: { type: String, required: [true, 'Prénom obligatoire!'] },
        lastName: { type: String, required: [true, 'Nom de famille obligatoire!'] },
        email: { type: String, required: [true, 'E-mail obligatoire!'] },
        password: { type: String, required: [true, 'Mot de passe obligatoire!'] },
        passwordHashed: { type: String, required: true },
        address: { type: String, required: [true, 'Adresse obligatoire!'] },
        Specialite: { type: String },
        categorie: { type: String },
        classe: { type: String },
        visibilite:{type:Boolean, default : false},
        role: {
            type: String,
            enum: ["ADMIN", "Etudiant", "Enseignant", "ALumni"],
            default: "ADMIN"
        },
        saisonUV: {
            type: Schema.Types.ObjectId,
            ref: "Saison",
        },
       Cv: {
            type: Schema.Types.ObjectId,
            ref: "Cv",
        },
        diplome : {
            type: Boolean,
           
            default: false
        }
    },
    {
        timestamps : true , versionKey : false
    }
);

module.exports =
    mongoose.models.Account || mongoose.model('Account', AccountSchema);
   