var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({

    hosts: ['https://search-myparksvisualization-es-jqfws6li4bsdlx35d2mltnqnka.ap-southeast-2.es.amazonaws.com']
});

/*
client.indices.delete({

    index: 'park'
}, function (err, resp, status) {

    if (err) {

        console.log(err);
    }
    else {

        console.log("del create", resp);
    }
});
*/
/*
client.indices.create({

    index: 'park'
}, function (err, resp, status) {

    if (err) {

        console.log("exist");
    }
    else {

        console.log("create", resp);
    }
});
*/
/*
client.index({
    index: 'park',
    id: '2',
    type: 'sensor',
    body: {
        "id": 2,
        "time": 11
    }
});*/

module.exports = client;
