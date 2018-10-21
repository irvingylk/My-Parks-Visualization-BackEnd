var express = require('express');
var router = express.Router();


router.post('/', function (req, res) {

});

module.exports = router;


async function ActivitiesInDays(parkId, startDate, endDate) {

    var startDate = new Date(startDate);
    var endDate = new Date(endDate); 
    var record = {"0":0, "1":0, "2":0, "3":0, "4":0, "5":0, "6":0};

    const resp = await client.get({

        index: 'park',
        type: 'park',
        id: parkId,
    });

    var facilitiesIds = resp["_source"]["facilities"];
    var sensors = []

    for (var i = 0; i < facilitiesIds.length; i++) {

        const resp2 = await client.get({

            index: 'facility',
            type: 'facility',
            id: facilitiesIds[i],
        });

        var sensorIds = resp2["_source"]["sensors"];
        Array.prototype.push.apply(sensors, sensorIds);
    }

    for (var i = 0; i < sensors.length; i++) {

        const resp3 = await client.search({
            index: 'sensor',
            type: 'sensor',
            size: 10000,
            body: {
                query: {
                    match: {
                        "id": sensors[i]
                    }
                }
            }
        });

        var objs = resp3['hits']['hits'];

        for(var i2 = 0; i2 < objs.length; i2 ++){

            var t = new Date(objs[i2]['_source']['time']);

            if (t >= startDate && t <= endDate){

                var day = t.getDay();
                record[day]++;

            }
        }
    }

    console.log(record);
}

