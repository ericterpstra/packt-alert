# Packt Alert

This application will send you a text message (SMS) every day with the name of the free eBook from PacktPub.com.

Respond to the text/sms with the special keyword (default is PACKT) and the app will log into your PacktPub.com account and add the free eBook to your library for you!

Probably. No guarantees.

##Requirements

* A valid PacktPub.com account (free)
* A Twilio Account with some credits added (not free)
* A web server (not free) or a computer running ngrok (free)

##Installation

Clone this repo onto a publicly reachable server. 

`git clone https://github.com/ericterpstra/packt-alert.git`

Copy .env.sample to .env

```
cd packt-alert
cp .env.sample .env
```

Edit the .env file with the details of your PacktPub.com account, Twilio Account (Your Twilio Phone Number, SID, and API Auth Token), and the phone number to recieve the SMS messages.

Run the app with `node index.js` (or use PM2 or forever or whatever process manager you want)

Log into Twilio and set up a phone number to accept SMS request at the URL of your node app. If you need instructions, go to [this article](https://www.twilio.com/docs/quickstart/php/sms/hello-monkey). 

If you are using ngrok, use this guide: [Test Your Webhooks Locally with ngrok](https://www.twilio.com/blog/2013/10/test-your-webhooks-locally-with-ngrok.html)

Now wait until 8:00pm (server time) and get free eBooks!