const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const InvitationSchema = new Schema(
    {
       
       partisipant: {
            type: Schema.Types.ObjectId,
            ref: "Compte",
        },
        Event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
        
        Validation: {
            type: Boolean , default:false
         
        },
    },
    {
        timestamps : true , versionKey : false
    }
);

module.exports =
    mongoose.models.Invitation|| mongoose.model('Invitation', InvitationSchema);
