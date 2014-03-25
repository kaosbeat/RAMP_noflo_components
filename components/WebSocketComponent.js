var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;
var io        = require('socket.io-client');


var WebSocketComponent = function() {
  var self = this;

  self.inPorts = {
    "in": new Port('string')
  };
  self.outPorts = {
    out:   new Port('string')
  };

  self.inPorts.in.on('disconnect', function () {
    self.outPorts.out.disconnect();
  });
  self.inPorts.in.on('data', function (data) {
    self.outPorts.out.send(data);
  });

  self.socket = io('http://localhost');
  self.socket.on('connect', function(){
    console.log("socket connection established");
    self.socket.on('event', self.onSocket);
    self.socket.on('disconnect', function(){});
  });

  self.onSocket = function(data){
    console.log(data);
  }
};


util.inherits(WebSocketComponent, Component);

exports.getComponent = function() {
  return new WebSocketComponent();
};
