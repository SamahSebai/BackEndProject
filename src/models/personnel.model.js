const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const personnelSchema = new Schema({
    first_name: {
        type : String,
        required : true
    },
    last_name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        validate: {
            validator: async function(email) {
              const administratif = await this.constructor.findOne({ email:email });
              if(administratif) {
                return false;
              }
              return true;
            },
            message: () => 'The specified email is already in use.'
          },
    },
    phone_number: {
        type : String,
        required : true
    },
    credentials_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        validate: {
            validator: async function(user) {
              const student = await this.constructor.findOne({ user:user });
              if(student) {
                return false;
              }
              return true;
            },
            message: () => 'User is already a personnel.'
          },
    },
});

module.exports = mongoose.model('personnel', personnelSchema, 'personnels');