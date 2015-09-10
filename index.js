var dotenv = require('dotenv').load();
var scheduler = require('node-schedule');
var packtalertCommands = require('./lib/packtalert-commands');
// Should we load twilio stuff?
if (process.env.USE_TWILIO == 'true') {
    var packtalertMessager = require('./lib/packtalert-messager-twilio');
}
// Should we load slack stuff?
if (process.env.USE_SLACK == 'true') {
    var packtalertMessager = require('./lib/packtalert-messager-slack');
}


// Listen for a response from the user and do a callback function if response is acceptable
packtalertMessager.awaitResponse(packtalertCommands.addToLib);

// Schedule a task for once a day
var schedulerCronString = process.env.CRON_SCHEDULE || '0 0 20 * * *';
scheduler.scheduleJob(schedulerCronString, fetchBookTitleAndSend);

//fetchBookTitleAndSend();

function fetchBookTitleAndSend(){
    console.log('Fecthing the title of the free book.');

    // Get the book of the day name and send it to the user
    if ((process.env.USE_TWILIO == 'true') || (process.env.USE_SLACK == 'true')) {
        packtalertCommands.getBookOfTheDayName()
            .then(packtalertMessager.sendBookTitle)
            .then(packtalertCommands.addToLib)
            .catch(handleError);
    } else {
        packtalertCommands.getBookOfTheDayName()
            .then(packtalertCommands.addToLib)
            .catch(handleError);
    }

}

function handleError(errMsg) {
    console.log(errMsg)
}