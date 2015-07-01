var Nightmare = require('nightmare');

var packtGet = {
    test: function(){
       console.log(process.env.PACKT_USERNAME);
    },

    getBookOfTheDayName : function() {

        return new Promise(function(resolve, reject){

            var name = '';

            new Nightmare()
                .goto('https://www.packtpub.com/packt/offers/free-learning')
                .wait()
                .evaluate(

                   function () {
                       return document.querySelector('.dotd-title h2').innerHTML.trim()
                   },

                   function (result) {
                       name = result;
                   }
                )
                .run(function(err,nightmare){

                    if (err) {
                        reject(err.message);
                    } else {
                        resolve(name);
                    }

                });

        });

    },

    addToLib : function(){

        new Nightmare({
            cookiesFile: process.env.COOKIES_FILE
        })
        .goto('https://www.packtpub.com/packt/offers/free-learning')
        .click('#account-bar-login-register a.login-popup')
        .wait(2000)
        .click('#email')
        .type('#email', process.env.PACKT_USERNAME)
        .type('#password', process.env.PACKT_PASSWORD)
        .click('#edit-submit-1')
        .wait()
        .click('#deal-of-the-day input.form-submit')
        .wait()
        .screenshot('./'+new Date().getTime()+'.jpg')
        .run(function(err,nightmare){
                if(err) {
                    console.log(err.message);
                } else {
                    console.log('Book successfully added to library')
                }
            });

        return this;
    }

};

module.exports = packtGet;

