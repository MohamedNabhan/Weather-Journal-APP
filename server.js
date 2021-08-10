// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// Initialize the main project folder
app.use(express.static('website'));
app.use(cors());
const port = 3001;

// Setup Server

const server= app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

//GET
app.get("/get", (req,res) => {
    res.send(projectData);
    console.log(projectData);
    projectData = [];
})

//Post
app.post('/weather', weatherData )
function weatherData(req, res){
    getRes = {
       temp: req.body.temp,
       date: req.body.date,
       userRes: req.body.userRes
    }
   console.log("req.body",req.body);
    projectData.push(getRes);
   console.log("projectData", projectData);

}