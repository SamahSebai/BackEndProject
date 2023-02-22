const Event = require("../models/event.model.js");


exports.insertEvent = async (req, res) => {

    // Create a Event object
    let event = new Event({
        ...req.body
    })

    // Save Event in the database
    event.save((err, inserted) => {
        if (err) {
            console.log(err)
            res.status(400).send(err.message)
        } else {
            console.log(inserted)
            res.json(inserted)
        }
    })
}




exports.updateEvent = async (req, res) => {
    var id = req.params.id
    Event.findByIdAndUpdate(id,req.body, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}

exports.deleteEvent = async (req, res) => {
    var id = req.params.id
    Event.findOneAndDelete({ '_id': id }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}

exports.getEvent = async (req, res) => {
    var id = req.params.id
    Event.findOne({ '_id': id }, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
      });
}