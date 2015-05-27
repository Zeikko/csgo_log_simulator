var http = require('http');
var dgram = require('dgram');
var fs = require('fs');

var ip = process.argv[2];
var port = process.argv[3];

var client = dgram.createSocket('udp4');

var i = 0;
var rows;

fs.readFile('data/csgo-log', 'ASCII', function (err,data) {
    if (err) {
        return console.log(err);
    }
    rows = data.split('\n');
    //rows = rows.slice(0,100);
    
    sendMessage(rows[i], callbackFunction)

});

function callbackFunction() {
    i += 1;
    if(i < rows.length) {
        sendMessage(rows[i], callbackFunction);
    }
}

function sendMessage(message, callback) {
        setTimeout(function() {
            var buffer = new Buffer(message);
            client.send(buffer, 0, buffer.length, port, ip, function(err, bytes) {
                if (err) {
                    throw err;
                }
                console.log(message + ' sent to: ' + ip +':'+ port);
                callback();
            });
        }, 10);
}

