const mongoose = require('mongoose');
const config = require('../config/config');
const nodemailer = require("nodemailer");
const Student = require("../models/student.model");


exports.add = async (modelName, data) => {
    const Model = mongoose.model(modelName);
    const document = new Model(data);
    await document.save();
    console.log("doc",document)
    return document;
}

exports.update = async (modelName, id, updates) => {
  const Model = mongoose.model(modelName);
  const updatedDocument = await Model.findByIdAndUpdate(id, updates, { new: true });
  return updatedDocument;
}

exports.get = async (modelName, id) => {
    const Model = mongoose.model(modelName);
    const document = await Model.findById(id);
    return document;
}

exports.delete = async (modelName, id) => {
    const Model = mongoose.model(modelName);
    const deletedDocument = await Model.findByIdAndDelete(id);
    return deletedDocument;
}

exports.getAll = async (modelName) => {
    const Model = mongoose.model(modelName);
    const documents = await Model.find();
    return documents;
  }

exports.addRole = async (id,role) => {
    const Model = mongoose.model("User");
    let document = await Model.findOne({_id:id});
    console.log("doccc:",document)
    

    if(! document?.roles?.includes(role)){
         user = await Model.findByIdAndUpdate(id, {roles : [role,...document.roles]}, { new: true });
    }
    return document;
}

exports.sendMail = async (reciever,subj,body) => {
    var smtpTransport = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: config.EMAIL,
            pass: config.EMAIL_PASS
        }
        });
    var mailOptions = {
    from: config.EMAIL,
    to: reciever,
    subject: subj,
    text: body
    };
    
    let info = await smtpTransport.sendMail(mailOptions).catch(err => console.log(err.map))
    return info
}

exports.sendEmails = async () => {
    try {
        const students = await Student.find();
        const emails = students.map(student => student.email);
        console.log("sending to : " ,emails);
        await emails.map( email => this.sendMail(email,"MAJ infos travail","Pour changer vos infos de travail veuillez visitez le lien suivant : https://isa2m.uma.tn"))
    } catch (error) {
        console.log({ message: error.message });
    }

}