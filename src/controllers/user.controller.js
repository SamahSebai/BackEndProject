const mongoose = require('mongoose');
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const services = require("../services/services")

exports.create = async (req, res) => {

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const username = req.body.username
    const email = req.body.email
    let user = await User.findOne({ username });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        username: req.body.username,
        password: hashPassword,
        roles: [],
        rights: [],
        email: email
    })

    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
            res.status(400).send(err.message)
        } else {
            let payload = { id: registeredUser._id, roles: registeredUser.roles, rights: registeredUser.rights };
            const token = jwt.sign(payload, config.TOKEN_SECRET);

            res.status(200).send({ token })
        }
    });
}

exports.login = async (req, res) => {

    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).send(err.message)
        } else {
            if (user) {
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) return res.status(401).send("Email or Password is wrong");

                let payload = { id: user._id, roles: user.role, rights: user.rights };
                const token = jwt.sign(payload, config.TOKEN_SECRET);

                res.status(200).header("auth-token", token).send({ "token": token });
            }
            else {
                res.status(401).send('Email is wrong')
            }

        }
    })
}





exports.updateUser = async (req, res) => {
    var id = req.params.id ? req.params.id : req.user.id

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    console.log(id, req.body)
    User.findByIdAndUpdate(id, req.body, function (err, result) {
        if (err) {
            res.status(400).send(err.message)
        }
        else {
            res.status(200).send(result)
        }
    })
}

exports.deleteUser = async (req, res) => {
    var id = req.params.id
    User.findOneAndDelete({ '_id': id }, function (err, result) {
        if (err) {
            res.status(400).send(err.message)
        }
        else {
            res.status(200).send(result)
        }
    })
}

exports.getUser = async (req, res) => {
    var id = req.params.id ? req.params.id : req.user.id
    User.findOne({ '_id': id }, function (err, result) {
        if (err) {
            res.status(400).send(err.message)
        }
        else {
            res.status(200).send(result)
        }
    });
}



exports.forgotPassword = async (req, res) => {
    const email = req.body.email
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User with this email does not exist' })
        }

        const token = jwt.sign({ _id: user._id }, config.TOKEN_SECRET, { expiresIn: '15m' })

        return user.updateOne({ resetLink: token }, (err, user) => {
            if (err) {
                return res.status(400).json({ error: 'Reset password link error' })
            } else {
                try {
                    services.sendMail(email, "Reset password", token)
                    return res.status(200).json({ message: 'Email has been sent, please follow the instructions' })
                }
                catch (error) {
                    return res.status(400).json({ error: error.message })
                }
            }

        })
    })
}

exports.resetPassword = (req, res) => {
    const { token, password } = req.body
    if (token) {
        jwt.verify(token, config.TOKEN_SECRET, function (error, decodedData) {
            if (error) {
                return res.status(400).json({ error: 'Incorrect token or it is expired' })
            }
            User.findOne({ resetLink: token }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({ error: 'User with this token does not exist' })
                }

                user.password = password
                User.findByIdAndUpdate(user._id,{password},(err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({ error: 'Reset Password Error' })

                    } else {
                        return res.status(200).json({ message: 'Your password has been changed' })
                    }
                })
            })
        })
    } else {
        return res.status(401).json({ error: "Authentication Error" })
    }
}

exports.resetPassword = (req, res) => {
    const { token, password } = req.body
    if (token) {
        jwt.verify(token, config.TOKEN_SECRET, function (error, decodedData) {
            if (error) {
                return res.status(400).json({ error: 'Incorrect token or it is expired' })
            }
            User.findOne({ resetLink: token }, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({ error: 'User with this token does not exist' })
                }

                user.password = password
                User.findByIdAndUpdate(user._id,{password},(err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({ error: 'Reset Password Error' })

                    } else {
                        return res.status(200).json({ message: 'Your password has been changed' })
                    }
                })
            })
        })
    } else {
        return res.status(401).json({ error: "Authentication Error" })
    }
}



exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        // Find the user with the specified email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare the provided old password with the user's hashed password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        // Update the user's password in the database
        await User.updateOne({ _id: user._id }, { $set: { password: hash } });
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
