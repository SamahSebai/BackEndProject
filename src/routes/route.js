const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
// const createPFeValidator = require('../validators/validator');

// don't forget to import middlewares's functions

const {demande} = require('../models/demande.model');
const {event} = require('../models/event.model');
const {internship} = require('../models/internship.model');
const {offer} = require('../models/offer.model');
const {pfa} = require('../models/pfa.model');
const {resume} = require('../models/resume.model');
const {student} = require('../models/student.model');
const {personnel} = require('../models/personnel.model');
const {company} = require('../models/company.model');
const {country} = require('../models/country.model');
const {promotion} = require('../models/promotion.model');
const {statisticPfe} = require('../models/statisticPfe.model');
const { VerifyUserToken, isAlumni, VerifyRole } = require('../middleware/auth');

// List of models
let models = ['demande','event','internship','offer','personnel','pfa','resume','student'];

const middlewareFunctions = {

    /*demande: [VerifyUserToken,isAlumni],
    event: [VerifyUserToken,VerifyRole(["teacher"])],
    internship: [VerifyUserToken,VerifyRole(["teacher"])],
    offer: [VerifyUserToken,isAlumni],
    personnel: [VerifyUserToken,VerifyRole(["administrator"])],
    pfa: [VerifyUserToken,VerifyRole(["teacher"])]*/

}


// Loop over models and define CRUD routes
models.forEach(modelName => {


    // Get the model
    const Model = mongoose.model(modelName);
    const middlewares = middlewareFunctions[modelName] || []
    // Create
    router.post(`/${modelName}`,middlewares,async (req, res) => {
        
        // req body contains data and info.
        // data contains the data to save, info contains object id that we need for references, or any other informations.

        const data=req.body.data;

        // special treatment for student and personnal 
        
        if(['student', 'personnel'].includes(modelName)){
            const salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(data.phone_number.toString(), salt);
            const User=mongoose.model("user");
            const userToSave= User({
                username : data.phone_number,
                password:hashedPassword,
                email:data.email,
                roles:data.roles
            });

            // saving the general user
            
            try {
                await userToSave.save();
            } catch (error) {
                console.log(error);
            }

            
            // saving the specific model ( personnel or student)
            let {roles, ...dataToSave}=data;
            const newModel = new Model({
                ...dataToSave,
                credentials_id : userToSave._id
            });          
            
            try {
                await newModel.save();
                res.status(201).send(newModel);
            } catch (error) {
                res.status(400).send(error);
            }

            // preparing for the statistics...
            // if(modelName=="student")
            // {
            //     if(data.alumni)
            //     {
                    
            //     }
            // }

        }

        else{
        // try to put all the informations in data ( don't forget to put object id references )
            try {
                const newModel = new Model(data)
                await newModel.save();
                res.status(201).send(newModel);
            } catch (error) {
                res.status(400).send(error);
            }
        }
    });
    

    // Read
    router.get(`/${modelName}`, async (req, res) => {

        try {
           if(modelName === "Internship")
           {
                models = await Model.find({}).populate('teacherId').populate('studentsId').exec();
           }else {
                models = await Model.find({});
           }
            res.send(models);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    router.get(`/${modelName}/:id`, async (req, res) => {
        try {
            const model = await Model.findById(req.params.id);
            if (!model) {
                return res.status(404).send();
            }
            res.send(model);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Update
    router.put(`/${modelName}/:id`, async (req, res) => {
        try {
            const model = await Model.findByIdAndUpdate(req.params.id, req.body.data, {
                new: true,
                runValidators: true
            });
            if (!model) {
                return res.status(404).send();
            }
            res.send(model);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    // Delete
    router.delete(`/${modelName}/:id`, async (req, res) => {
        
        // dont
        // forget
        // to
        // make
        // delete
        // on
        // cascade

        try {
            const model = await Model.findOneAndDelete({_id:req.params.id});
            if (!model) {
                return res.status(404).send();
            }
            res.send(model);
        } catch (error) {
            res.status(500).send(error);
        }
    });
});

module.exports = router;