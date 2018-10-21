var firebaseAdmin = require('firebase-admin');

var serviceAccount = require('../../myparksvisualizationKey.json')

firebaseAdmin.initializeApp({

    credential: firebaseAdmin.credential.cert(serviceAccount)
});


module.exports = firebaseAdmin;