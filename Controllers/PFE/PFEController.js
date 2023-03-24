const { count } = require('../../Models/PFE')
const PFE = require('../../Models/PFE')

exports.CreatePFE = async (req, res) => {

    try {

        const Result = await PFE.create(req.body)

        res.send(Result)
        console.log("PFE affecter")


    } catch (error) {

        res.status(500).send(error)
    }

}


exports.FetchPFE = async (req, res) => {

    try {

        const Result = await PFE.find({})

        res.send(Result)


    } catch (error) {

        res.status(500).send(error)
    }

}


exports.FetchPFEById = async (req, res) => {

    try {

        const Result = await PFE.findById(req.params.idPFE)

        res.send(Result)


    } catch (error) {

        res.status(500).send(error)
    }

}

exports.UpdatePFE = async (req, res) => {

    try {

        const Result = await PFE.findByIdAndUpdate(req.params.idPFE, req.body)

        const Resultupdate = await PFE.findById(req.params.idPFE)

        res.send(Resultupdate)


    } catch (error) {

        res.status(500).send(error)
    }

}


exports.DeletePFE = async (req, res) => {
    try {

        const Result = await PFE.findByIdAndDelete(req.params.idPFE)


        res.status(200).send('PFE deleted with success')
    } catch (error) {


        res.status(500).send('error serveur')
    }
}

exports.getPfeStatistics = async (req, res) => {

    try {
       /* const city_data = await PFE.aggregate([
            {
                $match: { type: { $eq: "pfe" } }
            },
            {
                $group: {
                    _id: "$internship_organization",
                    count: { $sum: 1 }
                }
            }
        ]);*/
        const company_data = await PFE.aggregate([
           /* {
                $match: { Titre: { $eq: "plateforme gestion" } }
            },*/
           {
                $group: {
                    _id: "$Societe",
                    count: { $sum: 1 }
                }
            }
        ]);
       /* const location_data = await PFE.aggregate([
            {
                $match: { type: { $eq: "pfe" } }
            },
            {
                $group: {
                    _id: "$location",
                    count: { $sum: 1 }
                }
            }
        ]);*/

        res.status(200).send({ /*...type_data,*/ ...company_data/*, ...location_data*/ });
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }

};