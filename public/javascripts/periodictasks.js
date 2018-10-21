var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('/3 * * * * *', function(){

  console.log("periodiccccc");
});