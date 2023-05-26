const PFA = require("../../Models/PFA");

exports.CreatePFA = async (req, res) => {
  try {
    const pickedBody = req.body;
    pickedBody.statue = "pending";
    const Result = await PFA.create(req.body);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.AffectStudent = async (req, res) => {
  try {
    const { studentId, pfaId } = req.params;
    const pfa = await PFA.findById(pfaId);
    if (pfa.students == null) pfa.students = [];
    if (pfa.Disponibilite == true) {
      //  pfa.Disponibilite=false;
      pfa.students.push(studentId);
      if (pfa.students.length === pfa.studentNumber) pfa.Disponibilite = false;

      await pfa.save();
      res.status(200).send(pfa);
    } else {
      res.status(300).send("mqx student attented");
    }

    //const Result = await PFA.create(req.body);

    // res.send(Result);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).send(error);
  }
};

exports.FetchPFA = async (req, res) => {
  try {
    let query = {};
    const technologie = req.query.Technologie;
    const idEns = req.query.idEns;
    if (technologie) {
      query = {
        Technologie: technologie,
      };
    }
    if (idEns) {
      query = {
        createdBy: idEns,
      };
    }
<<<<<<< HEAD
    const Result = await PFA.find(query).populate("createdBy");
    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFAById = async (req, res) => {
  try {
    const Result = await PFA.findById(req.params.idPFA);
=======
    exports.FetchPFAByStudentId = async (req , res)=>{

        try {
            
        const Result = await PFA.find({ etudiantId : req.params.idStudent})
        
        res.send(Result)
        
        
        } catch (error) {
        
            res.status(500).send(error)
        }
        
        }
    exports.UpdatePFA= async (req , res)=>{
>>>>>>> AhmedAminBackend

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdatePFA = async (req, res) => {
  try {
    const Result = await PFA.findByIdAndUpdate(req.params.idPFA, req.body);

    const Resultupdate = await PFA.findById(req.params.idPFA);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeletePFA = async (req, res) => {
  try {
    const Result = await PFA.findByIdAndDelete(req.params.idPFA);

    res.status(200).send("PFA deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};

exports.FetchPFAByIdEns = async (req, res) => {
  try {
    const Result = await PFA.find({
      createdBy: req.params.idEns,
    });
    res.json(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.FetchPFAStudents = async (req, res) => {
  try {
    const Result = await PFA.find({
      statue: "accepted",
      Disponibilite: true,
    });
    res.json(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};
