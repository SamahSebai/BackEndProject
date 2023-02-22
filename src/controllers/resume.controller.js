const Resume = require("../models/resume.model");

exports.insertResume = async (req, res) => {

    // Create a teacher object
    let resume = new Resume({
        ...req.body
    })

    // Save teacher in the database
    resume.save((err, inserted) => {
        if (err) {
            console.log(err)
        } else {
            console.log(inserted)
            res.json(inserted)
        }
    })
}

exports.updateResume = async (req, res) => {
    var id = req.params.id
    console.log(id,req.body)
    Resume.findByIdAndUpdate(id,req.body, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}

exports.getResumeById = async (req, res) => {
    var id = req.params.id
    Resume.findOne({ '_id': id }, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
      });
}

exports.getAllResume = async (req, res) => {
    console.log(res);
    Resume.find(function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
      });
}