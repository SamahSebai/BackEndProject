const Cv = require('../../Models/Cv')

exports.CreateCv = async (req , res)=>{

    try {
        
    const Result = await Cv.create(req.body)
    
    res.send(Result)
    
    
    } catch (error) {
    
        res.status(500).send(error)
    }
    
    }


exports.FetchCv = async (req , res)=>{

try {
    
const Result = await Cv.find({})

res.send(Result)


} catch (error) {

    res.status(500).send(error)
}

}


exports.FetchCvById = async (req , res)=>{

    try {
        
    const Result = await Cv.findById(req.params.idCv)
    
    res.send(Result)
    
    
    } catch (error) {
    
        res.status(500).send(error)
    }
    
    }

    exports.UpdateCv= async (req , res)=>{

        try {
            
        const Result = await Cv.findByIdAndUpdate(req.params.idCv , req.body)

        const Resultupdate = await Cv.findById(req.params.idCv)
        
        res.send(Resultupdate)
        
        
        } catch (error) {
        
            res.status(500).send(error)
        }
        
        }


        exports.DeleteCv = async (req , res )=>
        {
            try {

                const Result = await Cv.findByIdAndDelete(req.params.idCv) 

                
                res.status(200).send('Cv deleted with success')
            } catch (error) {
                

                res.status(500).send('error serveur')
            }
        }