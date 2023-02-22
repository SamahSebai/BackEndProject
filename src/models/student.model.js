const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    NIN:{
        type : Number,
        required : true
    },
    public_profile:{
        type : Boolean,
        default : false
    },
    first_name: {
        type : String,
        required : true
    },
    last_name: {
        type : String,
        required : true
    },
    birthdate: {
        type : Date,
        required : true
    },
    phone_number: {
        type : String,
        required : true
    },
    first_year:{
        type : Number,
        required : true
    },
    last_year:{
        type : Number,
    },
    class: {
        type : String
    },
    country: {
        type : String
    },
    city: {
        type : String
    },
    job_year:{
        type : Number,
    },
    company: {
        type : String
    },
    promotion: {
        type : String
    },
    alumni:{
        type: Boolean,
        default:false
    },
    resume:{
        type: Schema.Types.ObjectId,
        ref: 'resume'
    },
    internships:[
        {
            type: Schema.Types.ObjectId,
            ref: 'internship'
        }
    ],
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
    credentials_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        validate: {
            validator: async function (user) {
                const student = await this.constructor.findOne({ user: user });
                if (student) {
                    return false;
                }
                return true;
            },
            message: () => 'User is already a student.'
        },
    },
});

studentSchema.post('findOneAndDelete',function (res,next) {
    const studentId = this.getQuery();
    mongoose.model('internship').deleteMany(
        {student_id:studentId},function (err, result) {
            if (err) {
                console.log(`[error] ${err}`);
                next(err);
            } else {
                console.log(result);
                next();
            }
        }
    );
    mongoose.model('resume').deleteOne(
        {student_id:studentId},function (err, result) {
            if (err) {
                console.log(`[error] ${err}`);
                next(err);
            } else {
                console.log(result);
                next();
            }
        }
    );
    mongoose.model('user').deleteOne(
        {_id:res.credentials_id},function (err, result) {
            if (err) {
                console.log(`[error] ${err}`);
                next(err);
            } else {
                console.log(result);
                next();
            }
        }
    );
    next();
});
module.exports = mongoose.model('student', studentSchema, 'students');