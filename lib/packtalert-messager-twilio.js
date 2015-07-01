var http = require('http');
var url = require('url');
var twilio = require('twilio');

var client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {

    /**
     * Wait for a reponse from the user in the form of a SMS message.
     * If the response parameters are all correct, then run the callback.
     *
     * @param callback
     */
    awaitResponse : function awaitResponse(callback) {

        // set up web endpoint for twilio
        http.createServer(function(request, response){

            var parsedUrl = url.parse(request.url,true);

            // Check for the correct path, and that the text came from the correct user, and the text message has the correct content
            if ( parsedUrl.pathname == '/packtalert'
                && parsedUrl.query
                && parsedUrl.query.From === process.env.ALERT_PHONENUM
                && parsedUrl.query.Body.toUpperCase() === process.env.RESPONSE_KEYWORD ) {

                console.log("Adding book to lib");
                callback();
            }

            response.writeHead(200);
            response.end();

        }).listen(process.env.TWILIO_LISTENER_PORT);
        console.log('Twilio endpoint listening on port ' + process.env.TWILIO_LISTENER_PORT);
    },

    /**
     * Send the title of the book via SMS
     *
     * @param bookTitle
     */
    sendBookTitle : function sendBookTitle(bookTitle) {

        var msg = 'Packt Book: ' + bookTitle;

        client.sendSms(
            {
                to: process.env.ALERT_PHONENUM,
                from: process.env.TWILIO_PHONENUM,
                body: msg
            },
            function (error, message) {

                if (error) {
                    return console.log(error.message);
                } else {
                    console.log("Success! Message Sent");
                }

            }
        );

    }

};