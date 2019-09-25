# Nodemailer
Node.js Send Email

createTransport:
  host: 'smtp.googlemail.com', //your smtp server
  port: 465,  //smtp server's port
  secure: true, // true for 465, false for other ports
  auth: {
      user: 'test@gmail.com', // your email account
      pass: '123456' // your email account password
    }

sendMail:
    from: 'me@privateemail.com', // sender address
    to: 'you@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  })
    .then((info) => {
      res.render('contact', { msg: 'Email has been sent' })
      return;
    })
    .catch((error) => {
      return console.log(error);
    });
