client = require('./elasticsearchclient');
var fbadmin = require('./myparksvisualization-firebase-admin');
var fs = fbadmin.firestore();

/*
async function ActivitiesInDays(parkId, startDate, endDate) {

    var startDate = new Date(startDate);
    var endDate = new Date(endDate);
    var record = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 };
    var total = 0;

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

        for (var i2 = 0; i2 < objs.length; i2++) {

            var t = new Date(objs[i2]['_source']['time']);

            if (t >= startDate && t <= endDate) {

                var day = t.getDay();
                record[day]++;
                total++;
            }
        }
    }

    console.log(record);
    console.log(total);
}

async function ActivitiesInSpecificDay(parkId, day) {

    var theDay = new Date(day);
    theDay.setHours(0,0,0,0);
    var record = {};

    for(var i = 0; i < 48; i ++){

        record[i] = 0;
    }

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
            var temp = new Date(t);
            temp.setHours(0,0,0,0);

            if(temp.getTime() == theDay.getTime()){

                var hours = t.getHours();
                var min = t.getMinutes();
                var position = 0;

                if(min < 30){

                    position = 1 + (hours * 2)
                }
                else{
                    position = 2 + (hours * 2)
                }

                record[position-1]++;
                
            }
        }
    }

    console.log(record);
}

ActivitiesInDays('2', '2018-06-23T13:40:59.346Z', '2018-08-31T13:40:59.346Z');
ActivitiesInSpecificDay('1', '2018-08-25T13:40:59.346Z');
ActivitiesInSpecificDay('1', '2018-08-31T13:40:59.346Z');*/

