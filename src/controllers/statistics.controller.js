const Student = require("../models/student.model");
const Internship = require("../models/internship.model");



exports.getStudentAlimniStatistics = async (req, res) => {

    try {
        const city_data = await Student.aggregate([
            {
              $match: { alumni: { $eq: true } }
            },
            {
              $group: {
                _id: "$city",
                count: { $sum: 1 }
              }
            }
          ]);
        const company_data = await Student.aggregate([
            {
              $match: { alumni: { $eq: true } }
            },
            {
              $group: {
                _id: "$company",
                count: { $sum: 1 }
              }
            }
          ]);
        const promotion_data = await Student.aggregate([
            {
              $match: { alumni: { $eq: true } }
            },
            {
              $group: {
                _id: "$promotion",
                count: { $sum: 1 }
              }
            }
          ]);

        res.status(200).send({...city_data,...company_data,...promotion_data});
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
  };
  
exports.getPfeStatistics = async (req, res) => {

try {
    const city_data = await Internship.aggregate([
        {
            $match: { type: { $eq: "pfe" } }
        },
        {
            $group: {
            _id: "$internship_organization",
            count: { $sum: 1 }
            }
        }
        ]);
    const company_data = await Internship.aggregate([
        {
            $match: { type: { $eq: "pfe" } }
        },
        {
            $group: {
            _id: "$internship_organization",
            count: { $sum: 1 }
            }
        }
        ]);
    const location_data = await Internship.aggregate([
        {
            $match: { type: { $eq: "pfe" } }
        },
        {
            $group: {
            _id: "$location",
            count: { $sum: 1 }
            }
        }
        ]);

    res.status(200).send({...type_data,...company_data,...location_data});
} catch (err) {
    console.log(err);
    res.status(400).send(err.message);
}

};


//   exports.getChomageStatistics = async (req, res) => {
//     try {
//       const daysCount = await Student.aggregate([
//         {
//           $addFields: {
//             daysCount: {
//               $round: { $subtract: ['$last_year', '$job_year'] }
//             }
//           }
//         },
//         {
//           $group: {
//             _id: '$first_name',
//             count: { $sum: 1 }
//           }
//         }
//       ]);
  
//     //   console.log('daysCount', daysCount);
//       res.status(200).send({ daysCount });
//     } catch (err) {
//       console.log(err);
//       res.status(400).send(err.message);
//     }
//   };
  