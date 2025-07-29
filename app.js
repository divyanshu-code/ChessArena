const express = require('express')
const socket = require('socket.io')
const { Chess } = require('chess.js')
const http = require('http')
const path = require('path')
const { title } = require('process')
const { log } = require('console')

const app = express();
const server = http.createServer(app)

const io = socket(server)

const chess = new Chess();
let player1 = {} ;
let player2 = "W" ;

app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended : true }))

app.use(express.static(path.join(__dirname , 'Public')));

app.get("/" , (req , res)=>{
      res.render("index.ejs" , {title : "ChessArena"})
})

io.on("connection" , function(uniquesocket){
       
    console.log("connected");
    
})

server.listen(3000 , function(){
      console.log("server is running");
      
})



