var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var Topic = function() {
  var self = this;

  self.icon = 'list-alt';

  self.description = 'Information about a certain topic.'

  self.topic = {};

  self.inPorts = {
    "topic": new Port('object'),
    "send": new Port('bang')
  };
  self.outPorts = {
    "id"        :   new ArrayPort('string'),
    "description":   new ArrayPort('string'),
    "type"      :   new ArrayPort('string'),
    "title"     :   new ArrayPort('string'),
    "state"     :   new ArrayPort('string')
  };

  self.inPorts.topic.on('data', function (data) {
    self.topic = data;
  });


  self.inPorts.send.on('data', function (data) {
    console.log("Topic: \n"+
      {
        "id":self.topic.id,
        "description":self.topic.description,
        "type":self.topic.type,
        "title":self.topic.title,
        "state":self.topic.state
      });
    if(self.topic){
      self.outPorts.id.send(self.topic.id);
      self.outPorts.description.send(self.topic.description);
      self.outPorts.type.send(self.topic.type);
      self.outPorts.title.send(self.topic.title);
      self.outPorts.state.send(self.topic.state);
    }

  });
};

util.inherits(Topic, Component);

exports.getComponent = function() {
  return new Topic();
};
