/* This file will hold the express app. It is responsible for routing and  */
/* serving of static files.*/

var application_root = __dirname;
//var path = require("path");
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Alarm     = require('./public/models/alarmSchema.js');

// Database
mongoose.connect('mongodb://localhost/sunrise_database');


// Configures express. Getting data from a POST call
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

/*********************************ROUTES FOR OUR API*********************************/
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request made to server at: '+Date.now());
    console.log('Request was: '+req.toString());
    next(); // make sure we go to the next routes and don't stop here
});

// create an alarm (accessed at POST http://localhost:8080/api/alarms)
router.route('/alarms')
.post(function(req, res) {
    var alarm = new Alarm();      // create a new instance of the Alarm model
    alarm.title = req.body.title;  // set the alarm name (comes from the request (from params (instead of body))
    alarm.creator = req.body.creator;
    alarm.alarm_duration = req.body.alarm_duration;
    alarm.alarm_time = req.body.alarm_time;
    alarm.comment = req.body.comment;
    alarm.mon = req.body.mon;
    alarm.tue = req.body.tue;
    alarm.wed = req.body.wed;
    alarm.thu = req.body.thu;
    alarm.fri = req.body.fri;
    alarm.sat = req.body.sat;
    alarm.sny = req.body.sun;

    alarm.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Alarm created!' });
    });
}) //no ; here because this is actually chained to .post().get()

// get all alarms (accessed at GET http://localhost:8080/api/alarms)
.get(function(req, res) {
    Alarm.find(function(err, alarms) {
        if (err)
            res.send(err);
        res.json(alarms);
    });
});

// on routes that end in /alarm/:alarm_id
router.route('/alarms/:alarm_id')
// get the alarm with that id (accessed at GET http://localhost:8080/api/alarms/:alarm_id)
    .get(function(req, res) {
        Alarm.findById(req.params.alarm_id, function(err, alarm) {
            if (err)
                res.send(err);
            res.json(alarm);
        });
    })
    // update the alarm with this id (accessed at PUT http://localhost:8080/api/alarms/:alarm_id)
    .put(function(req, res) {
        // use our alarm model to find the alarm we want
        Alarm.findById(req.params.alarm_id, function(err, alarm) {
            if (err)
                res.send(err);
            alarm.title = req.body.title;
            alarm.creator = req.body.creator;
            alarm.alarm_duration = req.body.alarm_duration;
            alarm.alarm_time = req.body.alarm_time;
            alarm.comment = req.body.comment;
            alarm.mon = req.body.mon;
            alarm.tue = req.body.tue;
            alarm.wed = req.body.wed;
            alarm.thu = req.body.thu;
            alarm.fri = req.body.fri;
            alarm.sat = req.body.sat;
            alarm.sny = req.body.sun;  // update the alarm's info
            // save the alarm
            alarm.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Alarm updated!' });
            });
        });
    })
    // delete an alarm by alarm_id. part of the specific ID api calls.
    .delete(function(req, res) {
        Alarm.remove({
            _id: req.params.alarm_id
        }, function(err, alarm) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// --------------------------REGISTER OUR ROUTES ---------------------------- //
// all of our routes will be prefixed with /api
app.use('/api', router);

// ===========================START THE SERVER=============================== //
app.listen(port);
console.log('Magic happens on port ' + port);

app.get('/api', function (req, res) {
  res.send('Sunrise API is running');
});
