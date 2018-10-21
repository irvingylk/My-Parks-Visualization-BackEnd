var express = require('express');
var router = express.Router();
var admin = require('../public/javascripts/myparksvisualization-firebase-admin');

var TOPICS = { NOH: "NOH", UI: "UI" };
var notification = require('../public/javascripts/notifications');


router.post('/', function (req, res) {

    console.log('subscriptions called...');
    var body = req.body;

    topic = body['topic'];
    token = body['token'];
    action = body['action'];

    if(TOPICS[topic] == undefined){

        res.send(JSON.stringify({ result: 0 }));
    }

    if (action == 'subscribe') {

        admin.messaging().subscribeToTopic(token, topic)
            .then(function (response) {
                console.log('Successfully subscribed to topic:', response);
                res.send(JSON.stringify({ result: 1 }));
            })
            .catch(function (error) {
                console.log('Error subscribing to topic:', error);
            });
    }
    else if (action == 'unsubscribe') {

        admin.messaging().unsubscribeFromTopic(token, topic)
            .then(function (response) {
                console.log('Successfully unsubscribed from topic:', response);
                res.send(JSON.stringify({ result: 1 }));
            })
            .catch(function (error) {
                console.log('Error unsubscribing from topic:', error);
                res.send(JSON.stringify({ result: 0 }));
            });

    }
    else{

        res.send(JSON.stringify({ result: 0 }));
    }
});

module.exports = router;