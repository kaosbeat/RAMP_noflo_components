var util      = require('util');
var noflo     = require('noflo');
var requestify = require('requestify');
var Port      = noflo.Port;
var Component = noflo.Component;




var SimpleTweet = function() {
  var self = this;
  self.icon = 'fa-twitter';
  self.number = 5;
  self.hashtag = "mixbe";

  self.inPorts = {
    'hashtag': new Port('string'),
    'number': new Port('integer'),
    'get': new Port('bang')
  };


  self.outPorts = {
    'out':   new Port('object')
  };

  self.inPorts.number.on('data', function (number) {
    self.number = number;
    console.log('number = '+ self.number);
  });



  self.inPorts.hashtag.on('data', function (hashtag) {
    self.hashtag = hashtag;
    console.log('hashtag = '+ self.hashtag);
  });

  self.inPorts.get.on('data', function () {
    console.log('getting tweets');
    // requestify.get('http://search.twitter.com/search.json?q=json&rpp=5&include_entities=true').then(function(response) {;
      requestify.get('http://datatank.gent.be/WerkEnEconomie/Werkzoekendenwerkloosheidsduur5j.json').then(function(response) {;
    // requestify.get('http://search.twitter.com/search.json?q='+self.hashtag+'&rpp='+self.number+'&include_entities=true').then(function(response) {
        // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
        tweets = response.getBody();
        console.log(tweets);
        self.outPorts.out.send(tweets);

    });

  });

  console.log('init');




};

util.inherits(SimpleTweet, Component);

exports.getComponent = function() {
  return new SimpleTweet();
};
