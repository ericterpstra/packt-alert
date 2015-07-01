var dotenv = require('dotenv').load();
var scheduler = require('node-schedule');
var packtalertCommands = require('./lib/packtalert-commands');
var packtalertMessager = require('./lib/packtalert-messager-twilio');

// Listen for a response from the user and do a callback function if response is acceptable
packtalertMessager.awaitResponse(packtalertCommands.addToLib);

// Schedule a task for once a day
var schedulerCronString = process.env.CRON_SCHEDULE || '0 0 20 * * *';
scheduler.scheduleJob(schedulerCronString, fetchBookTitleAndSend);

//fetchBookTitleAndSend();

function fetchBookTitleAndSend(){
    console.log('Fecthing the title of the free book.');

    // Get the book of the day name and send it to the user
    packtalertCommands.getBookOfTheDayName()
        .then(packtalertMessager.sendBookTitle)
        .catch(handleError);
}

function handleError(errMsg) {
    console.log(errMsg)
}