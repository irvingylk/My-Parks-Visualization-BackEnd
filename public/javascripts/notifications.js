var firebaseAdmin = require('./myparksvisualization-firebase-admin');

function messageForNotOperatingHour(topic, data) {

    var message = {
        data: {
            park: data['park'],
            parkLocation: data['parkLocation'],
            triggeredArea: data['triggeredArea'],
            time: data['time']
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    firebaseAdmin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

function messageForIdle(topic, data) {

    var message = {
        data: {
            park: data['park'],
            parkLocation: data['parkLocation'],
            facility: data['facility'],
            reportCount: data['reportCount'],
            lastUse: data['lastUse']
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    firebasAdmin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

var notification = function notification(topic, data) {

    switch (topic) {

        case 'NOH':
            messageForNotOperatingHour(topic, data);
            break;
        case 'UI':
            messageForIdle(topic, data);
            break;
        default:
    }
};



module.exports = notification;