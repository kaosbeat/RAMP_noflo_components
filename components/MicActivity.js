var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;
var io        = require('socket.io-client');

// var WebSocketComponent = require('../components/WebSocketComponent');


var MicActivity = function() {
  var self = this;
  var socket;

  self.description = 'Detects speech on a certain microphone.'

  self.icon = 'microphone';

  self.micId = 0;

  self.inPorts = {
    "unit": new Port('string')
  };
  self.outPorts = {
    out:   new Port('string')
  };

  self.inPorts.unit.on('data', function (data) {
    self.micId = data;
    self.outPorts.out.send(data);
  });

  console.log('initializing sockets');
  socket = io.connect('http://localhost:3000');
  socket.on('connect', function(){

    console.log("socket connection established");

    socket.on('event', function(data){console.log("Mic Activity triggered")});
    socket.on('disconnect', function(){
      console.log("socket connection lost");
    });
    socket.on('error', function(err){console.log(err)});
  });

  self.onSocket = function(data){
    console.log("Mic Activity triggered");
    self.outPorts.out.send(data);
  }
};


util.inherits(MicActivity, Component);

exports.getComponent = function() {
  return new MicActivity();
};
