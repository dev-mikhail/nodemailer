const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// view engine setup
app.engine('handlebars', exphbs({
  extname: 'handlebars',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// staic folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
  console.log('create transporter');
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '', // generated ethereal user
      pass: '' // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log(transporter + '  send email');
  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '', // sender address
    to: '', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  })
    .then((info) => {
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.render('contact', { msg: 'Email has been sent' })
      return;
    })
    .catch((error) => {
      return console.log(error);
    });
})

app.listen(3000, () => console.log('Server started...'));
