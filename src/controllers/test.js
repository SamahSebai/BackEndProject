var nodemailer = require("nodemailer");



exports.testGet = async (_req, res) => {

    res.status(200).send('welcome isamm')
}

exports.testMail = async (_req, res) => {



    var smtpTransport = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: "hazemjday@outlook.com",
            pass: "********"
        }
        });
    var mailOptions = {
    from: 'hazemjday@outlook.com',
    to: '7azemjday@gmail.com',
    subject: 'Test mail',
    text: 'Test mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mail\nTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mailTest mail.'
    };
    
    smtpTransport.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        res.status(400).send('not sent !')
    } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('welcome isamm')
    }
    });
    
}

