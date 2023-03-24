
const PFA = require('../../Models/PFA')
const PostulerPFA = require('../../Models/PostulerPFA')

exports.CreatePostulerPFA = async (req, res) => {

    try {
        const verify = await PFA.findById(req.body.Stage)
console.log(verify);
        if (verify.Disponibilite == true) {
            const Result = await PostulerPFA.create(req.body)
            res.send(Result)
        } else {
            res.status(400).send("PFA has alredy been affected choose another one ")

        }

    } catch (error) {
console.log(error)
        res.status(500).send(error)
    }

}

