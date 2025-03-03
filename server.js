const bGround = require('fcc-express-bground');
const myApp = require('./myApp');
const express = require('express');
const app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use((req, res, next) => {
    const allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    const origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

let path = require('path');        // Import 'path' module to handle file paths

app.use("/public", express.static(path.join(__dirname, "public")));

// Serve an HTML file at the root route "/"
app.get("/", function(req, res) {
  let absolutePath = path.join(__dirname, "views", "index.html");  // Create absolute path
  res.sendFile(absolutePath);  // Send the file as a response
});

// Add middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// API endpoint for GET and POST requests at /name
app.route('/name')
  .get((req, res) => {
    // Get 'first' and 'last' query parameters from the URL
    const firstName = req.query.first;
    const lastName = req.query.last;

    if (firstName && lastName) {
      res.json({ name: `${firstName} ${lastName}` });
    } else {
      res.status(400).send('Missing first or last name');
    }
  })
  .post((req, res) => {
    // If POST data is provided (optional, as it's not mentioned in the task)
    const firstName = req.body.first;
    const lastName = req.body.last;

    if (firstName && lastName) {
      res.json({ name: `${firstName} ${lastName}` });
    } else {
      res.status(400).send('Missing first or last name');
    }
  });

const port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, () => {
  bGround.log(`Node is listening on port ${port}...`);
});
