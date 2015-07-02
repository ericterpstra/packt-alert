# Packt Alert

This application will send you a text message (SMS) every day with the name of the free eBook from PacktPub.com.

Respond to the text/sms with the special keyword (default is PACKT) and the app will log into your PacktPub.com account and add the free eBook to your library for you!

Probably. No guarantees.

Also, this probably violates some sort of licensing terms of agreement or something with PacktPub. So don't use it. It is for educational purposes only. Really, it is.  I made it to play around with Node, Nightmare.js, and the Twilio API.

##Requirements

* A valid PacktPub.com account (free)
* A Twilio Account with some credits added (not free)
* A web server (not free) or a computer running ngrok (free)
* PhantomJS installed on your system (free)

##Installation

Clone this repo onto a publicly reachable server. 

`git clone https://github.com/ericterpstra/packt-alert.git`

Install node modules, then copy .env.sample to .env

```
cd packt-alert
npm install
cp .env.sample .env
```

Edit the .env file with the details of your PacktPub.com account, Twilio Account (Your Twilio Phone Number, SID, and API Auth Token), and the phone number to recieve the SMS messages.

Run the app with `node index.js` (or use PM2 or forever or whatever process manager you want)

Log into Twilio and set up a phone number to accept SMS request at the URL of your node app. The default port for the node app is 3000, but this can be changed in the .env file.  Also, the Twilio URL must have the path `/packtalert` appended to the domain/ip.  For example, an acceptable URL would be `http://mynodeapp.io:3000/packtalert`.  If you need instructions on where to put the URL in Twilio, go to [this article](https://www.twilio.com/docs/quickstart/php/sms/hello-monkey). 

If you are using ngrok, use this guide: [Test Your Webhooks Locally with ngrok](https://www.twilio.com/blog/2013/10/test-your-webhooks-locally-with-ngrok.html)

Now wait until 8:00pm (server time) and get free eBooks!
