var util      = require('util');
var noflo     = require('noflo');
var requestify = require('requestify');
var Port      = noflo.Port;
var Component = noflo.Component;



var getJSON = function() {
  var self = this;
  self.icon = 'fa-json';
  self.url = null;

  self.inPorts = {
    'url': new Port('string'),
    'get': new Port('bang')
  };


  self.outPorts = {
    'out':   new Port('object')
  };

  self.inPorts.url.on('data', function (url) {
    self.url = url;
  });

  self.inPorts.get.on('data', function () {
    console.log('getting JSON');
    requestify.get(self.url).then(function(response) {;
    // requestify.get('http://datatank.gent.be/WerkEnEconomie/Werkzoekendenwerkloosheidsduur5j.json').then(function(response) {;
    // requestify.get('http://search.twitter.com/search.json?q='+self.hashtag+'&rpp='+self.number+'&include_entities=true').then(function(response) {
        // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
        json = response.getBody();
        console.log(json);
        self.outPorts.out.send(json);

    });

  });


};

util.inherits(getJSON, Component);

exports.getComponent = function() {
  return new getJSON();
};
