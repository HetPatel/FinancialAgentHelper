// var http = require('http');
//
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end('Hello World!');
// }).listen(8080);
var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://hettest5%40gmail.com:hetpatel123@smtp.gmail.com');


var array1 = ['het09it@gmail.com', 'hettest5@gmail.com'];

array1.forEach(function(email) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Het', // sender address
      to: email, // list of receivers
      //bcc: ,
      subject: 'Hello ✔ 😊', // Subject line
      text: 'Hello world ?', // plaintext body
      html: '<b>Seperate Tests</b></ br><p>This is a new line.</p><p>This is line 2.</p><button style="color:#800000">Text</button>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
});
