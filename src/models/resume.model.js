const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    student_id:{
        type: Schema.Types.ObjectId,
        ref: 'student'
    },
    description:String,
    contact:{
        phone_number:Number,
        e_mail:String,
    },
    academic_background:[
        {
            year:String,
            description:String

        }
    ],
    content:[
        {
            section:[
                {
                    title:String,
                    description:String,
                    date:String,
                    //logo(file)
                }
            ]
        }
    ]
});

resumeSchema.post('save',function(req,next) {
    //const studentId = this.getQuery();
    mongoose.model('student').updateOne(
        {_id:req.student_id},
        { resume: req._id }
        ,function (err, result) {
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

module.exports = mongoose.model('resume', resumeSchema, 'resumes');