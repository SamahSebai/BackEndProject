const Demande = require('../../Models/Demande')

exports.CreateDemande = async (req , res)=>{

    try {
        
    const Result = await Demande.create(req.body)
    
    res.send(Result)
    
    
    } catch (error) {
    
        res.status(500).send(error)
    }
    
    
}
exports.FetchDemande = async (req, res) => {
    try {
      const Result = await Demande.find({});
  
      res.send(Result);
    } catch (error) {
      res.status(500).send(error);
    }
  };