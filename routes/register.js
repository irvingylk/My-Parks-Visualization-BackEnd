var express = require('express');
var router = express.Router();
var firebaseAdmin = require('../public/javascripts/myparksvisualization-firebase-admin')


router.post('/', function (req, res) {

    var register = 0;
    var requestBody = req.body;

    firebaseAdmin.auth().createUser({
        email: requestBody['email'],
        password: requestBody['password']
    })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);

            var db = firebaseAdmin.database();
            var usersRef = db.ref("users");
            var uid = userRecord.uid;
            register = 1;

            usersRef.push().set({

                uid: uid,
                isAdmin: requestBody['isAdmin']
            });

            return firebaseAdmin.auth().createCustomToken(uid)
        })
        .then(function (customToken) {
            // Send token back to client
            console.log("Custom Token:", customToken);

            res.send(JSON.stringify({ register: register, token: customToken }))
        })
        .catch(function (error) {
            console.log("Error creating new user:", error);
            res.send(JSON.stringify({ register: register, token: null }))
        });
});

module.exports = router;