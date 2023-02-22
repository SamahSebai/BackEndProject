const Teacher = require("../models/teacher.model");
const services = require("../services/services")


exports.addTeacher = async (req, res) => {
    // Create a teacher object
    let teacherData = new Teacher({
        _id : req.body.user,
        user:req.params.user,
        ...req.body
    })
    // Save teacher in the database
    try{
        const teacher = await services.add("teacher",teacherData)
        await services.addRole(teacher.user,"teacher")
        res.json(teacher)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createTeacher = async (req, res) => {
    try {
        const newUser = {...req.body,roles:["teacher"]};
        const user = await services.add("User", newUser);
        const newTeacher = { _id : user._id,user: user._id , ...req.body};
        const teacher = await services.add("Teacher", newTeacher);
        res.status(201).json({ message: "Teacher and User created successfully", teacher });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateTeacher = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : req.user.id;
        const updates = req.body;
        const updatedTeacher = await services.update("teacher",id, updates);
        res.status(200).json({ message: "Teacher updated successfully", updatedTeacher });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteTeacher = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTeacher = await services.delete("Teacher",id);
        if(!deletedTeacher){
            res.status(404).json({ message: "Teacher not found"});
        }else{
            res.status(200).json({ message: "Teacher deleted successfully", deletedTeacher });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getTeacher = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : req.user.id;
        const teacher = await services.get("teacher",id);
        if(!teacher){
            res.status(404).json({ message: "Teacher not found"});
        }else{
            res.status(200).json( teacher );
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await services.getAll("teacher");
        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}