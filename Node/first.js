var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dupetopetoman@gmail.com',
    pass: 'Ic3Universe'
  }
});

var mailOptions = {
  from: 'dupetopetoman@gmail.com',
  to: 'godadis803@corylan.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});