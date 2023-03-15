const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Serve static files such as CSS and JavaScript
app.use(express.static('public'));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// configure bodyParser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/smartparking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// define a schema for the form data
const formDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  agreedToTerms: {
    type: Boolean,
    required: true
  }
});

// define a model for the form data using the schema
const FormData = mongoose.model('FormData', formDataSchema);

// handle form submission
app.post('/submit', (req, res) => {
  const formData = new FormData({
    userId: req.body.userId,
    emailId: req.body.emailId,
    password: req.body.password,
    agreedToTerms: req.body.agreedToTerms
  });
  formData.save()
    .then(() => res.send('Form submitted successfully'))
    .catch(error => res.send(`Error submitting form: ${error.message}`));
});


// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
