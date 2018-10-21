var express = require('express');
var router = express.Router();
var fbadmin = require('../public/javascripts/myparksvisualization-firebase-admin');
var fs = fbadmin.firestore();
var es_client = require('../public/javascripts/elasticsearchclient');


router.get('/parks', (req, res, next) => {

    var parksRef = fs.collection('parks');

    parksRef.get()
        .then(snapshot => {

            var parkList = [];

            snapshot.forEach(doc => {

                var park = {};
                park['Uid'] = doc.id;
                park['Name'] = doc.data()['name'];
                park['Desc'] = doc.data()['desc'];
                park['Allow'] = doc.data()['allow'];
                park['Oph'] = doc.data()['oph'];
                park['Lat'] = doc.data()['location']['_latitude'];
                park['Lng'] = doc.data()['location']['_longitude'];
                park['Img'] = doc.data()['img'];
                parkList.push(park);
            });

            res.json(parkList);
        })
        .catch(err => {

            console.log('Error getting documents', err);
        });
});

router.get('/adminparks', (req, res, next) => {

    const email = req.query.email;

    var parksRef = fs.collection("administers/" + email + "/parks");

    parksRef.get()
        .then(snapshot => {
            var parkList = [];

            snapshot.forEach(doc => {

                var park = {};
                park['Id'] = doc.data()['park_id']
                park['Name'] = doc.data()['name'];
                park['Lat'] = doc.data()['location']['_latitude'];
                park['Lng'] = doc.data()['location']['_longitude'];
                parkList.push(park);
            });
            res.json(parkList);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
})

router.get('/adminparkfacilities', (req, res, next) => {

    const parkId = req.query.park_id;

    var facilitiesRef = fs.collection("facilities").where('park_id', '==', parkId);

    facilitiesRef.get()
        .then(snapshot => {
            var facilitiesList = [];

            snapshot.forEach(doc => {

                var facility = {};
                facility['Lat'] = doc.data()['location']['_latitude'];
                facility['Lng'] = doc.data()['location']['_longitude'];
                facilitiesList.push(facility);
            });
            console.log(facilitiesList.length);
            res.json(facilitiesList);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
})

router.get('/facilities', (req, res, next) => {

    var park_uid = req.query.park_uid;
    var parkRef = fs.collection('parks').doc(park_uid);
    var facilitiesRef = fs.collection('facilities');

    facilitiesRef.where('park', '==', parkRef).get()
        .then(snapshot => {

            facilityList = [];

            snapshot.forEach(doc => {

                var facility = {};
                facility['Uid'] = doc.id;
                facility['Lat'] = doc.data()['location']['_latitude'];
                facility['Lng'] = doc.data()['location']['_longitude'];
                facility['Cate'] = doc.data()['cate'];
                facility['Availability'] = doc.data()['availability'];
                facilityList.push(facility);
            });

            res.json(facilityList);
        })
        .catch(err => {

            console.log('Error getting documents', err);
        });
});

router.get('/businessrate', async (req, res, next) => {

    try {
        console.log(req.query.park_uid);
        var stat = await OverallUsagesInDayTime(req.query.park_uid);
    }
    catch (e) { };

    var li = [];

    for (var key in stat) {

        li.push({ time: key, value: stat[key] });
    }

    res.json(li);
});

router.get('/popularparks', (req, res, next) => {
    res.json([{
        Name: 'Sunset Park',
        Desc: 'Sunset Park conserves an important area of bushland situated in the Adelaide Hills face zone. A fantastic network of walking and cycling trails introduces you to the diverse native wildlife, cultural heritage and spectacular views of the Adelaide Hills and surrounds.',
        Allow: 'Dogs are not permitted in this park.',
        Oph: 'Open Time: Mon-Fri 7AM-6PM',
        Lat: 45.523970,
        Lng: -122.663081,
        Img: 'https://firebasestorage.googleapis.com/v0/b/myparksvisualizationapp.appspot.com/o/park-images%2Fpark1.jpg?alt=media&token=174d5405-ab5e-49b8-b1f0-e3dc4d7c7ae4'
    }, {
        Name: 'Bill Bell Park',
        Desc: 'The park narrow creek flows through a steep sided valley with majestic river red gums, some more than 300 years old. This area was once a favourite camping, hunting and gathering ground for the Kaurna Aboriginal People. Large river red gums line Brownhill Creek while blue gum woodland climbs the valley slopes. The park also supports a small, threatened, ecosystem of greybox grassy woodland.',
        Allow: 'Dogs are welcome in this park.',
        Oph: 'Open Time: Mon-Fri 6AM-5PM',
        Lat: 45.528788,
        Lng: -122.684633,
        Img: 'https://firebasestorage.googleapis.com/v0/b/myparksvisualizationapp.appspot.com/o/park-images%2Fpark2.jpg?alt=media&token=6380f8d0-785a-4724-b82d-47f406b18d77'
    }, {
        Name: 'Ellengo Park',
        Desc: 'This suburban park holds some unexpected attractions. Come and discover the magnificent remnant grey box eucalypts environment and take in the 360 degree views of the surrounding Adelaide plains, coastline and hills.You can ride your bike on roads open to the public or use the specific cycling trails and tracks on offer in Shepherds Hill Recreation Park. If you are a bit more adventurous with your bike riding, the park offers a bicycle jumps-track.',
        Allow: 'Dogs are welcome in this park.',
        Oph: 'Open Time: 7AM-5PM every day',
        Lat: 45.538788,
        Lng: -122.644633,
        Img: 'https://firebasestorage.googleapis.com/v0/b/myparksvisualizationapp.appspot.com/o/park-images%2Fpark3.jpg?alt=media&token=beda8cf2-5cc8-4fdd-801b-0089e78e8eba'

    }, {
        Name: 'Bill Bell Park',
        Desc: 'The park narrow creek flows through a steep sided valley with majestic river red gums, some more than 300 years old. This area was once a favourite camping, hunting and gathering ground for the Kaurna Aboriginal People. Large river red gums line Brownhill Creek while blue gum woodland climbs the valley slopes. The park also supports a small, threatened, ecosystem of greybox grassy woodland.',
        Allow: 'Dogs are welcome in this park.',
        Oph: 'Open Time: Mon-Fri 6AM-5PM',
        Lat: 45.528788,
        Lng: -122.684633,
        Img: 'https://firebasestorage.googleapis.com/v0/b/myparksvisualizationapp.appspot.com/o/park-images%2Fpark2.jpg?alt=media&token=6380f8d0-785a-4724-b82d-47f406b18d77'
    }, {
        Name: 'Matla Park',
        Desc: 'Matla Park is internationally recognised as an area of conservation and geological significance. The park conserves the nationally threatened greybox grassy woodland vegetation which was once abundant across southern Australia. The park is also home to a rock formation, known as sturt tillite, that is believed to have been formed from glacial material dropped from ice floating in the ocean that covered South Australia 800 million years ago.',
        Allow: 'Dogs are welcome in this park.',
        Oph: 'Open Time: 7AM-7PM every day',
        Lat: 45.538788,
        Lng: -122.674633,
        Img: 'https://firebasestorage.googleapis.com/v0/b/myparksvisualizationapp.appspot.com/o/park-images%2Fpark4.jpg?alt=media&token=30a0a8d8-210e-4a60-bc64-d7a9d1c5b607'
    }])
});

async function OverallUsagesInDayTime(parkUid) {

    var parkRef = fs.collection('parks').doc(parkUid);
    var facilitiesRef = fs.collection('facilities');

    var facilitiesUids = await facilitiesRef.where('park', '==', parkRef).get()
        .then(snapshot => {

            var facilitiesUids = [];

            snapshot.forEach(doc => {

                facilitiesUids.push(doc.id);
            });

            return facilitiesUids;
        })
        .catch(err => {

            console.log('Error getting documents', err);
        });

    console.log(facilitiesUids);

    var sensorsUids = [];

    for (var i = 0; i < facilitiesUids.length; i++) {

        var facilityRef = fs.collection('facilities').doc(facilitiesUids[i]);
        var sensorsRef = fs.collection('sensors');
        var partial = await sensorsRef.where('facility', '==', facilityRef).get()
            .then(snapshot => {

                var partial = [];
                snapshot.forEach(doc => {

                    partial.push(doc.id);
                });

                return partial;
            })
            .catch(err => {


            });

        sensorsUids.push.apply(sensorsUids, partial);
    }

    console.log(sensorsUids);

    var stat = {};
    stat['7AM-8AM'] = 0;
    stat['8AM-9AM'] = 0;
    stat['9AM-10AM'] = 0;
    stat['10AM-11AM'] = 0;
    stat['11AM-12PM'] = 0;
    stat['12PM-1PM'] = 0;
    stat['1PM-2PM'] = 0;
    stat['2PM-3PM'] = 0;
    stat['3PM-4PM'] = 0;
    stat['4PM-5PM'] = 0;
    stat['5PM-6PM'] = 0;
    stat['6PM-7PM'] = 0;

    for (var i = 0; i < sensorsUids.length; i++) {

        await sensorUsage(sensorsUids[i], stat);
    }

    return stat;
}

async function sensorUsage(sensorId, stat) {

    try {

        var resp = await es_client.search({
            index: 'sensor',
            type: 'sensor',
            size: 10000,
            body: {
                query: {
                    match: {
                        "sensorId": sensorId
                    }
                }
            }
        });
    }
    catch (e) {

        console.log("no usage");
    }

    var usages = resp['hits']['hits'];

    for (var i = 0; i < usages.length; i++) {

        var t = new Date(usages[i]['_source']['time']);
        var h = t.getHours();

        if (h == 7) {

            stat['7AM-8AM']++;
        }
        else if (h == 8) {

            stat['8AM-9AM']++;
        }
        else if (h == 9) {

            stat['9AM-10AM']++;
        }
        else if (h == 10) {

            stat['10AM-11AM']++;
        }
        else if (h == 11) {

            stat['11AM-12PM']++;
        }
        else if (h == 12) {

            stat['12PM-1PM']++;
        }
        else if (h == 13) {

            stat['1PM-2PM']++;
        }
        else if (h == 14) {

            stat['2PM-3PM']++;
        }
        else if (h == 15) {

            stat['3PM-4PM']++;
        }
        else if (h == 16) {

            stat['4PM-5PM']++;
        }
        else if (h == 17) {

            stat['5PM-6PM']++;
        }
        else if (h == 18) {

            stat['6PM-7PM']++;
        }
    }
}

module.exports = router;