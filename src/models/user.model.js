const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        validate: {
            validator: async function(username) {
              const user = await this.constructor.findOne({ username:username });
              if(user) {
                return false;
              }
              return true;
            },
            message: () => 'The specified username is already in use.'
          },
    },
    password: {
        type : String,
        required : true
    },
    roles:{
        type : [String],
        enum:["student", "teacher", "administrator", "responsable", "directeur"]
    },
    rights: {
        type : [String],
        default : []
    },
    resetLink: {type: String, default: ''},
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (email) {
                const student = await this.constructor.findOne({ email: email });
                if (student) {
                    return false;
                }
                return true;
            },
            message: () => `Email is used !`
        },
    },
});

module.exports = mongoose.model('user', userSchema, 'users');