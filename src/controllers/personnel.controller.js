const Personnel = require("../models/personnel.model");Administratif
const services = require("../services/services")


exports.addPersonnel = async (req, res) => {
    let personnelData = new Personnel({
        _id : req.params.user,
        credentials_id:req.params.credentials_id,
        ...req.body
    })

    try {
        const personnel = await services.add("personnel", personnelData);
        await services.addRole(personnel.user,"role")
        res.status(201).json({ message: "Personnel created successfully", personnel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createPersonnel = async (req, res) => {
    try {
        const newUser = {...req.body,roles:["personnel"]};
        const user = await services.add("user", newUser);
        const newPersonnel = { _id : user._id,user: user._id };
        const personnel = await services.add("personnel", newPersonnel);
        res.status(201).json({ message: "personnel and User created successfully", personnel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updatePersonnel = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedPersonnel = await services.update("personnel", id, updates);
        if(!updatedPersonnel){
            res.status(404).json({ message: "Personnel not found"});
        }else{
            res.status(200).json({ message: "Personnel updated successfully", updatedPersonnel });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





exports.deletePersonnel = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPersonnel = await services.delete("personnel", id);
        if(!deletedPersonnel){
            res.status(404).json({ message: "Personnel not found"});
        }else{
            res.status(200).json({ message: "Personnel deleted successfully", deletedPersonnel });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getPersonnel = async (req, res) => {
    try {
        const id = req.params.id;
        const personnel = await services.get("personnel", id);
        if(!personnel){
            res.status(404).json({ message: "Personnel not found"});
        }else{
            res.status(200).json({ personnel });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAllPersonnels = async (req, res) => {
    try {
        const personnels = await services.getAll("personnel");
        res.status(200).json({ personnels });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}