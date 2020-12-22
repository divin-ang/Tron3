var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Console } = require('console');
const { Socket } = require('dgram');

process.setMaxListeners(1000)

let Room = require('./Room.js');


/*
io.sockets.on('connection', (socket) => {
     
  socket.on('join', function (data) {
    if(rooms[rooms.length-1].nombre>1){
      r =new Room()
      rooms.push(r)
      console.log("2")
      socket.in(rooms[rooms.length-1].players[0]).emit('new_msg', {msg: 'HI'});
      socket.in(rooms[rooms.length-1].players[1]).emit('new_msg', {msg: 'HI'});
    }
    rooms[rooms.length-1].nombre= rooms[rooms.length-1].nombre+1
    rooms[rooms.length-1].players.push(data.pseudo+socket.id)
    socket.join(data.pseudo+socket.id); // We are using room of socket io
  });
      
  })
  */
      //Mouvement update

// Functions
//generate id



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  io.on('connection', function(socket){
     console.log('a user connected');
    
     socket.on('disconnect', function () {
       console.log('socket disconnected');
       console.log()
     });


    socket.send('Hello');

    // or with emit() and custom event names
    socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

    // handle the event sent with socket.send()
    socket.on('message', (data) => {
      
    });

    // handle the event sent with socket.emit()
    socket.on('salutations', (elem1, elem2, elem3) => {
      console.log(elem1, elem2, elem3);
    });

/*
    socket.on('player', function(player){
      //console.log(player);
      
      socket.broadcast.emit('opponent', player);
    });
    */
});

let roomno = 0;

let roomPlayer=[]
let rp = new Room()
rp.name=roomno+""
roomPlayer.push(rp)


let nRoom=0;
io.sockets.on('connection', function(socket) {
  socket.on("numRoom",(data)=>{
    nRoom=data
   
  })
 

  process.setMaxListeners(1000)
  
    
  
    socket.on("pseudo",(pseudo)=>{
      /*if(socket.id===roomPlayer[nRoom].socketId[0])
        roomPlayer[nRoom].pseudo[0]=pseudo
      else if(socket.id===roomPlayer[nRoom].socketId[1])
         roomPlayer[nRoom].pseudo[1]=pseudo
      console.log(roomPlayer[nRoom].pseudo.length+"jjjnjbjbjb")
       
     */ 
    if(socket.id===roomPlayer[pseudo.num].socketId[0])
        roomPlayer[pseudo.num].pseudo[0]=pseudo.pseudo
      else if(socket.id===roomPlayer[pseudo.num].socketId[1])
         roomPlayer[pseudo.num].pseudo[1]=pseudo.pseudo
     })

   socket.on("pret",(pseudo)=>{
    let room = roomPlayer[roomPlayer.length- 1]
    room.socketId.push(socket.id)
    room.pseudo.push(pseudo)
    socket.join(""+roomno);
    io.sockets.to(""+roomno).emit("numRoom",roomno)
    console.log(roomno)
    if (roomPlayer[roomPlayer.length-1].socketId.length==2){
     
   io.sockets.to(socket.id).emit("numRoom",roomno)
   
   io.sockets.to(roomno+"").emit("jouer")
   io.sockets.to(roomno+"").emit("lancer")
   let pseudos = roomPlayer[roomno].pseudo
   io.sockets.to(roomPlayer[roomno].socketId[0]).emit("pseudo",{pseudo1:pseudos[0],pseudo2:pseudos[1]})
   io.sockets.to(roomPlayer[roomno].socketId[1]).emit("pseudo",{pseudo1:pseudos[1],pseudo2:pseudos[0]})
  
   io.sockets.to(roomPlayer[roomno].socketId[1]).emit('currentPlayer',{current:1,opponent:0});
   io.sockets.to(roomPlayer[roomno].socketId[0]).emit('currentPlayer',{current:0,opponent:1});
   roomno++;
   console.log("apap")
  let room =new Room();
   
 


roomPlayer.push(room)

     
 
 }
  
    

   

})
let num =0;
socket.on("numRoom",(data)=>{
  num=data
})
socket.on('winner', function(winner){
  
  io.sockets.to(winner.num+"").emit('winner', winner.winner);
});

/*
socket.on("playerAndPosition",(data)=>{
 

  
  roomPlayer[data.num].players[0]=data.player

  roomPlayer[data.num].players[1]=data.player


})
*/
socket.on("demarrer",function(numRoom){

io.sockets.to(roomPlayer[numRoom].socketId[0]).emit("jouer")
io.sockets.to(roomPlayer[numRoom].socketId[1]).emit("jouer")


 
})


socket.on("player",(data)=>{
  /*
  let numRoom =0;
  socket.on("numRoom",(data)=>{
    numRoom=data
  })
 io.sockets.to(roomPlayer[numRoom].socketId[0]).emit('opponent',roomPlayer[numRoom].players[1]);
 io.sockets.to(roomPlayer[numRoom].socketId[1]).emit('opponent',roomPlayer[numRoom].players[0]);
*/
if(roomPlayer[data.num].socketId[0]==socket.id)
io.sockets.to(roomPlayer[data.num].socketId[1]).emit('opponent',data.player);
else
io.sockets.to(roomPlayer[data.num].socketId[0]).emit('opponent',data.player);
})
})

//Now server would listen on port 8080 for new connection

http.listen(8080, function(){
     console.log('listening on *:8080');
});