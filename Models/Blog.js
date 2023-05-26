const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const BlogSchema = new Schema(
    {
       
        Type: { type: String },
        Sujet: { type: String},
        description: { type: String },
        Moderateur:{type: mongoose.Schema.Types.ObjectId,
            ref: "Account",}
        

    },
    {
        timestamps: true, versionKey: false
    }
);

module.exports =
    mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
