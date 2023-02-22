const Pfa = require("../models/pfa.model.js");


exports.insertPfa = async (req, res) => {

    // Create a Pfa object
    let pfa = new Pfa({
        ...req.body
    })

    // Save Pfa in the database
    pfa.save((err, inserted) => {
        if (err) {
            console.log(err)
            res.status(400).send(err.message)
        } else {
            console.log(inserted)
            res.json(inserted)
        }
    })
}




exports.updatePfa = async (req, res) => {
    var id = req.params.id
    Pfa.findByIdAndUpdate(id,req.body, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}

exports.deletePfa = async (req, res) => {
    var id = req.params.id
    Pfa.findOneAndDelete({ '_id': id }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
}

exports.getPfa = async (req, res) => {
    var id = req.params.id
    Pfa.findOne({ '_id': id }, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
      });
}