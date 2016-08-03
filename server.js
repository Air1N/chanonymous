var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;
var connections = 0;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
   connections++;
   io.emit('connectionSend', connections);
   console.log('a user connected');
   socket.on('disconnect', function(){
       connections--;
       console.log('user disconnected');
   });
   socket.on('chat message', function(msg){
	io.emit('chat message', msg);
   });
   socket.on('color message', function(colora){
	io.emit('color message', colora);
   });
});

http.listen(port, function(){
  console.log('listening on *: ' + (port).toString());
});
