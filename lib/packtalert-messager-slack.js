var http = require('http');
var url = require('url');
var Slack = require('node-slack');
var client = new Slack(process.env.SLACK_HOOK_URL, process.env.SLACK_OPTIONS);

module.exports = {

    /**
     * Send the title of the book via SMS
     *
     * @param bookTitle
     */
    sendBookTitle : function sendBookTitle(bookTitle) {

        var msg = 'Packt Book: ' + bookTitle + ' <https://www.packtpub.com/packt/offers/free-learning>';

        client.send(
            {
                text: msg,
                channel: '#foo',
                username: 'FreeBook',
                icon_emoji: ':books:',
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