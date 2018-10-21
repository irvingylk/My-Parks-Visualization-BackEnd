var es_client = require('./elasticsearchclient');

var c = [];
var now = new Date();
function getRandomTime(now) {

    var end = now;
    var start = new Date();
    start.setDate(end.getDate() - 10);

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
/*
es_client.indices.delete({

    index: '_all'
}, function (err, res) {

    if (err) {
        console.log(err);
    }
    else {

        console.log("Indexes have been deleted!");
    }
});
*/

for (var i = 0; i < 150; i++) {

    //createFakeDate("sYgFArpFZjDuDqWflCim");
    //createFakeDate("w1qwPly5nVweQa23kwFL");
    createFakeDate("w7DMHpWsCzHlM3o67J5d");
    console.log(i);
}


async function createFakeDate(uid) {

    return await es_client.index({

        index: 'sensor',
        type: 'sensor',
        body: {

            "sensorId": uid,
            "time": getRandomTime(now),
        }
    }, function (err, resp, status) {

        if (err) {

            console.log(err);

        }
    });
}
/*
es_client.index({

    index: 'facility',
    type: 'facility',
    id: '1',
    body: {
        "sensors": ["1"]
    }
}, function (err, resp, status) {

    console.log(resp);

});

es_client.index({

    index: 'facility',
    type: 'facility',
    id: '2',
    body: {
        "sensors": ["2"]
    }
}, function (err, resp, status) {

    console.log(resp);
});

es_client.index({

    index: 'facility',
    type: 'facility',
    id: '1',
    body: {
        "sensors": ["1"]
    }
}, function (err, resp, status) {

    console.log(resp);
});

es_client.index({

    index: 'facility',
    type: 'facility',
    id: '3',
    body: {
        "sensors": ["3"]
    }
}, function (err, resp, status) {

    console.log(resp);
});

es_client.index({

    index: 'facility',
    type: 'facility',
    id: '4',
    body: {
        "sensors": ["4"]
    }
}, function (err, resp, status) {

    console.log(resp);
});

es_client.index({

    index: 'facility',
    type: 'facility',
    id: '5',
    body: {
        "sensors": ["5"]
    }
}, function (err, resp, status) {

    console.log(resp);
});


es_client.index({

    index: 'park',
    type: 'park',
    id: '1',
    body: {
        "lat": 41.12,
        "lon": -71.34,
        "facilities": ["1", "2", "3"]
    }
}, function (err, resp, status) {

    console.log(resp);
});

es_client.index({

    index: 'park',
    type: 'park',
    id: '2',
    body: {
        "lat": 55.33,
        "lon": 66.53,
        "facilities": ["4", "5"]
    }
}, function (err, resp, status) {

    console.log(resp);
});
*/


