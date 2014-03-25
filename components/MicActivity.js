var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;
var io        = require('socket.io-client');

// var WebSocketComponent = require('../components/WebSocketComponent');


var MicActivity = function() {
  var self = this;
  var socket;

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
  console.log('init sockets');
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
