var express = require('express');
var router = express.Router();
var firebaseAdmin = require('../public/javascripts/myparksvisualization-firebase-admin')

router.post('/', function (req, res) {

    var token = req.body['token'];
    
    admin.auth().verifyIdToken(token)
        .then(function (decodedToken) {
            var uid = decodedToken.uid;
            // ...
        }).catch(function (error) {
            // Handle error
        });
});