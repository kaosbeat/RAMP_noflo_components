var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var Delegate = function() {
  var self = this;

  self.icon = 'user';

  self.description = 'Information about a certain delegate.'

  self.delegate = {};

  self.inPorts = {
    "delegate": new Port('object'),
    "send": new Port('bang')
  };
  self.outPorts = {
    "id"        :   new ArrayPort('string'),
    "firstName" :   new ArrayPort('string'),
    "lastName"  :   new ArrayPort('string'),
    "country"   :   new ArrayPort('string'),
    "title"     :   new ArrayPort('string'),
    "affiliation":   new ArrayPort('string'),
  };

  self.inPorts.delegate.on('data', function (data) {
    self.delegate = data;
  });


  self.inPorts.send.on('data', function (data) {
    console.log("Delegate: \n"+
      {
        "id":self.delegate.id,
        "firstName":self.delegate.firstName,
        "lastName":self.delegate.lastName,
        "country":self.delegate.country,
        "title":self.delegate.title,
        "affiliation":self.delegate.affiliation
      });
    if(self.delegate){
      self.outPorts.id.send(self.delegate.id);
      self.outPorts.firstName.send(self.delegate.firstName);
      self.outPorts.lastName.send(self.delegate.lastName);
      self.outPorts.country.send(self.delegate.country);
      self.outPorts.title.send(self.delegate.title);
      self.outPorts.affiliation.send(self.delegate.affiliation);
    }

  });
};

util.inherits(Delegate, Component);

exports.getComponent = function() {
  return new Delegate();
};
