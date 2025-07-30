// client1 dosen't directly connected to the person or client2 . client1 directly connected to the server first then to client2. And socket.io comes in work 
// there are mainly three ways in which socket.io connect to the frontend.

const { Chess } = require("chess.js");

// 1) socket.io sends data to every client like ---------- group chats.
// 2) socket.io sends data to a single chats like ---------one to one chats.
// 3) socket.io sends data to a every client except oneself like ---------- shown a rendering message typing in whatsapp while chatting  it is also called broadcasting.

const socket = io();

// socket.emit("divyanshu")                          // emit means to send the data to server(backend).

// socket.on("divyanshu neha" , function(){         // on means to receive a data from backend.
//        console.log("accepted");
       
// })

const chess = new Chess();
const boardElemnt = document.querySelector(".chessBoard")