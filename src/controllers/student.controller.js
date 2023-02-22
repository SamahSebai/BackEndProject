const Student = require("../models/student.model");
const User = require("../models/user.model")
const Excel = require('exceljs');
const bcrypt = require("bcryptjs");

const fs = require('fs');

const services = require("../services/services")



exports.uploadStudents = (req, res) => {
    // Connect to the MongoDB database

    // Create a new instance of the ExcelJS Workbook
    const workbook = new Excel.Workbook();

    // Read the data from the Excel file using the buffer
    workbook.xlsx.load(req.files[0].buffer)
        .then(() => {
            // Get the first sheet
            const sheet = workbook.getWorksheet(1);
            // Iterate over the rows in the sheet starting from the second row
            sheet.eachRow({ includeEmpty: false, startRow: 2 }, (row, n) => {
                if (n > 1) {
                    try {
                        console.log("...", row.values)
                        // Get the values of the cells
                        let email = typeof row.values[6] === "string" ? row.values[6] : row.values[6].text
                        const salt = bcrypt.genSaltSync(10);
                        const hashPassword = bcrypt.hashSync(email, salt);
                        // Create new user and student objects with the values
                        console.log("...", row.values)
                        const user = new User({
                            email: email,
                            password: hashPassword,
                            username: email,
                            roles: ["student"]
                        })
                        const student = new Student({
                            credentials_id: user.id,
                            NIN: row.values[1],
                            first_name: row.values[2],
                            last_name: row.values[3],
                            birthdate: row.values[4],
                            first_year: row.values[5],
                            email: email,
                            phone_number: row.values[7]
                        });
                        // Save the objects to the MongoDB database

                        user.save();
                        student.save();
                    }
                    catch (err) {
                        console.log("row not saved")
                    }
                }

            });
            res.status(200).json({ message: "Students uploaded successfully" });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};
exports.createStudent = async (req, res) => {
    try {
        const newUser = { ...req.body, roles: ["student"] };
        const user = await services.add("User", newUser);
        const newStudent = { _id: user._id, user: user._id, ...req.body, roles: ["student"] };
        const student = await services.add("student", newStudent);
        res.status(201).json({ message: "Student and User created successfully", student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addStudent = async (req, res) => {
    const studentData = new Student({
        _id: req.params.user,
        user: req.params.user,
        ...req.body
    })



    try {
        const student = await services.add("student", studentData)
        //const student = studentData
        var a = await services.addRole(student.user, "student")
        //cosole.log("a",a)
        res.json(student)
    } catch (error) {
        res.status(400).send(error);
    }
}



exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : req.user.id;
        const updates = req.body;
        const updatedStudent = await services.update(id, updates);
        res.status(200).json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedStudent = await services.delete(id);
        if (!deletedStudent) {
            res.status(404).json({ message: "Student not found" });
        } else {
            res.status(200).json({ message: "Student deleted successfully", deletedStudent });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getStudent = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id : req.user.id;
        const student = await services.get(id);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
        } else {
            res.status(200).json(student);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.getAllStudents = async (req, res) => {
    try {
        const students = await services.getAll("student");
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}