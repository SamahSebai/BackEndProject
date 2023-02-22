const Company = require("../models/company.model");
const Personnel = require("../models/personnel.model");
const Student = require("../models/student.model");
const Internship = require("../models/internship.model");
const Resume = require("../models/resume.model");
const Offer = require("../models/offer.model");
const Demande = require("../models/demande.model");
const Pfa = require("../models/pfa.model");
const User = require("../models/user.model");

const m2s = require('mongoose-to-swagger');

module.exports = {
    user: m2s(User),
    pfa: m2s(Pfa),
    personnel: m2s(Personnel),
    student: m2s(Student),
    internship: m2s(Internship),
    resume: m2s(Resume),
    offer: m2s(Offer),
    demande: m2s(Demande),
    company: m2s(Company),
  };