const express = require('express')
const app = express()

const path = require("path");
const config = require('config');
const bodyParser = require('body-parser')
const JWT = require('jwt-simple');
const Service = require('./service');
const validate = require('jsonschema').validate;
const Schema = require('./schema');

const url = require('url');

app.use(express.static(path.join(__dirname, 'doc')));
app.use(bodyParser.json());

app.listen(4000, function () {
  console.log('Sample student registration app listening on port 4000!');
})

app.post('/api/register',function(req,res){
	console.log('/api/register invoked by a user');
  validateRequest(req,res,registerSchema);
  Service.registerUser(req,res);
});

app.post('/api/suspend',function(req,res){
	console.log('/api/suspend invoked by a user');
  validateRequest(req,res,suspendSchema);
  Service.studentsSuspend(req,res);
  });

app.post('/api/retrievefornotifications',function(req,res){
	console.log('/api/retrievefornotifications invoked by a user');
  validateRequest(req,res,notificationSchema);
  Service.retrieveNotifications(req,res);
  });

app.get('/api/commonstudents',function(req,res){
	console.log('/api/commonstudents invoked by a user');
	var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  Service.commonStudents(query.teacher, req, res);
 });

function validateRequest(req,res, schema){

  var isValid = validate(req.body, schema).valid;
  console.log('is valid request ' + isValid);

  if(!isValid){
    res.statusCode = 400;
    res.send("Invalid request, please check and submit again");
  }
}