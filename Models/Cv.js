const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const CvSchema = new Schema(
    {
       
        stages: { type: String, required: [true, 'stages obligatoire!'] },
        formations: { type: String, required: [true, 'formations obligatoire!'] },
        compétences: { type: String, required: [true, ' compétences obligatoire!'] },

    },
    {
        timestamps: true, versionKey: false
    }
);

module.exports =
    mongoose.models.Cv || mongoose.model('Cv', CvSchema);
