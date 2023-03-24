const Invitation = require('../../Models/Invitation')

exports.CreateInvitation = async (req , res)=>{

    try {
        
    const Result = await Invitation.create(req.body)
    
    res.send(Result)
    
    
    } catch (error) {
    
        res.status(500).send(error)
    }
    
    
}