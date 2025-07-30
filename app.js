const express = require('express')
const socket = require('socket.io')
const { Chess } = require('chess.js')
const http = require('http')
const path = require('path')

const app = express();
const server = http.createServer(app)

const io = socket(server)

const chess = new Chess();
let players = {} ;
let player1 = "W" ;

app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended : true }))

app.use(express.static(path.join(__dirname , 'Public')));

app.get("/" , (req , res)=>{
      res.render("index.ejs" , {title : "ChessArena"})
})

io.on("connection" , function(uniquesocket){
       
    console.log("connected");

//     uniquesocket.on( "divyanshu", function(){         // receive the data on backend from fontend.
//          io.emit("divyanshu neha")                   // send again the data to frontend.
         
//     })
 
      // uniquesocket.on("disconnect" , ()=>{
      //         console.log("disconnected");
              
      // })

      if(!players.white){
              
            players.white = uniquesocket.id ;
            uniquesocket.emit("playerRole" , "W");
      }else if (!players.black){
            players.black = uniquesocket.id ;
            uniquesocket.emit("playerRole" , "B");
      }else{
             
            uniquesocket.emit("spectator")
      }
    

      uniquesocket.on('disconnect' , function(){
             
             if(uniquesocket.id === players.white){
                  delete players.white;
             }else if(uniquesocket.id === players.black){
                    delete players.black;
             }
      })

      uniquesocket.on("move" , (move)=>{

            try{

                  if( chess.turn() === "W" && uniquesocket.id != players.white )  return ;
                  if( chess.turn() === "B" && uniquesocket.id != players.black )  return ;

                  const result = chess.move(move) ;

                  if(result){
                        player1 = chess.turn();
                        io.emit();
                        io.emit("boardState" , chess.fen())
                  }else{
                         console.log("Invalid move" , move);
                         uniquesocket.emit("Invalid Move" , move)
                         
                  }


            }catch(err){
                     console.log(err);
                     
            }

      })
})

server.listen(3000 , function(){
      console.log("server is running");
      
})



