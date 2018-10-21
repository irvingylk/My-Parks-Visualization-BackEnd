var mqtt = require('mqtt');
var firebaseAdmin = require('./myparksvisualization-firebase-admin');
var fs = firebaseAdmin.firestore();
var es_client = require('./elasticsearchclient');

var options = {

    port: 19368,
    clientId: "nodejs",
    username: 'wvfmuugu',
    password: 'c44QzVJb8Bc_',
};

var client = mqtt.connect('tcp://m12.cloudmqtt.com', options);

client.on('connect', function () { // When connected

    // subscribe to a topic
    console.log('connected');
    client.subscribe('sensor/usage', {qos: 2})

    // publish a message to a topic
    /*
    client.publish('h', 'my message', function () {
        console.log("Message is published");
        client.end(); // Close the connection when published
    });*/
});

client.on('message', function (topic, message) {

    if (topic == 'sensor/usage') {
        console.log(message);
        saveSensorUsage(JSON.parse(message.toString()));
    }
});

function saveSensorUsage(data) {

    console.log("json data:")
    console.log(data);

    var sensorRef = fs.collection('sensors').doc(data['Mac']);
    var sensorDoc = sensorRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
          var facilityId = doc.data()['facility_id'];
          console.log(facilityId);
          var facilityRef = fs.collection('facilities').doc(facilityId);
          var ts = firebaseAdmin.firestore.Timestamp.fromDate(new Date(data['Time']));
          var updateSingle = facilityRef.update({ last_active: ts});
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

    /*
    es_client.index({

        index: 'sensor',
        type: data['type'],
        body: {
            "id": data['id'],
            "time": data['time']
        }
    }, function(err, resp, status){
    });
    */
}