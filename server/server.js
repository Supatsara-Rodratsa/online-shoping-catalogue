const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const fs = require('fs');
const CONSTANTS = require('./constants');
const axios = require('axios');
const franceProduct = require(CONSTANTS.PRODUCT_SERVICE_API.FR);
const config = require('dotenv')
config.config()
/**
 * Set up Email Template
 */
const templateSource = fs.readFileSync(
  './views/receipt-template.handlebars',
  'utf8'
);
const template = Handlebars.compile(templateSource);

/**
 * Set up MailTrap Hosting
 */
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const app = express();

/**
 * Allow Accessing Data
 */
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.send('Email API service is up and running');
});

/**
 * Fetch Product For Frontend
 */
app.get('/products/:lang', (req, res) => {
  const lang = req.params.lang;
  if (lang === CONSTANTS.LANGUAGE.FR) res.json(franceProduct);
  else {
    fetchProduct(res, CONSTANTS.PRODUCT_SERVICE_API.EN);
  }
});

/**
 * Email Notification to customer
 */
app.post('/orders', (req, res) => {
  const body = req.body;
  if (body) {
    const data = transformData(body);
    const emailContent = template(data);

    // Define the email options
    const mailOptions = {
      from: '"Our Product Catalogue" <product.catalogue@domain.com>',
      to: body.email,
      subject: 'Thank You for Your Purchase',
      html: emailContent,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ status: 'Success' });
      }
    });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000);

module.exports = app;

function fetchProduct(res, path) {
  axios
    .get(path)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
}

function generateUniqueId() {
  return new Date().getTime().toString();
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}

function transformData(reqBody) {
  const { firstName, lastName, address, orderItems, totalPrice } = reqBody;
  const data = {
    name: firstName + ' ' + lastName,
    product_name: 'Our Product Catalogue',
    receipt_id: generateUniqueId(),
    date: getCurrentDate(),
    receipt_details: [...orderItems],
    address: address.address,
    country: address.country,
    zipCode: address.zipCode,
    state: address.state || '-',
    total: `€ ${totalPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
  };
  return data;
}
