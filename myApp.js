require('dotenv').config();  // Load environment variables
const express = require('express');
const app = express();

console.log("Hello World");

// Use express built-in middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to check if body is being parsed
app.use((req, res, next) => {
  console.log('Parsed Body:', req.body); // Log the body to debug
  next();
});

// Middleware function to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // Pass control to the next middleware or route
});

console.log("Logger middleware is active!");

app.post('/name', (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  res.send(`First Name: ${firstName}, Last Name: ${lastName}`);
});

// Route for /json with uppercase logic
app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message });
});

// Chained middleware for /now route to add current time
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Add current time to req.time
  next();  // Pass control to the next handler
}, function(req, res) {
  res.json({ time: req.time });  // Send time in response as JSON
});

module.exports = app;





















 module.exports = app;
