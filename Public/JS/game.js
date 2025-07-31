// client1 dosen't directly connected to the person or client2 . client1 directly connected to the server first then to client2. And socket.io comes in work 
// there are mainly three ways in which socket.io connect to the frontend.

// 1) socket.io sends data to every client like ---------- group chats.
// 2) socket.io sends data to a single chats like ---------one to one chats.
// 3) socket.io sends data to a every client except oneself like ---------- shown a rendering message typing in whatsapp while chatting  it is also called broadcasting.


// socket.emit("divyanshu")                          // emit means to send the data to server(backend).

// socket.on("divyanshu neha" , function(){         // on means to receive a data from backend.
//        console.log("accepted");

// })

const socket = io();
const chess = new Chess();
const boardElemnt = document.querySelector(".chessBoard")


let draggedPiece = null;
let playerRole = null;
let sourceSquare = null;

const renderBoard = () => {

    const board = chess.board();

    boardElemnt.innerHTML = "";

    board.forEach((row, rowindex) => {

        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div")
            squareElement.classList.add(
                "square", (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece", square.color === 'w' ? "white" : "black"
                )

                pieceElement.innerText = getPieceUnicode(square);

                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex }
                        e.dataTransfer.setData("text/plain", "")                   // to handle drag functinality 
               
                    }

                })

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                })


                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault()
            });


            squareElement.addEventListener("drop" , (e)=>{
               
                e.preventDefault();
              
                if(draggedPiece){
                      const targetSource = {
                          
                           row : parseInt(squareElement.dataset.row),
                           col : parseInt(squareElement.dataset.col),
                      }

                      handleMove(sourceSquare , targetSource)
                }
            })

            boardElemnt.appendChild(squareElement)

        });

    });

    if(playerRole === 'b'){
         boardElemnt.classList.add('flipped')
    }else{
          
          boardElemnt.classList.remove('flipped') ;
    }
}


const handleMove = (source , target) => {
    
    const move={
         
        from : `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to : `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion : "q"
    }

    socket.emit("move" , move)
}

const getPieceUnicode = (piece) => {
    
    const unicode= {
       
        p : "♙",
        r : "♜",
        n : "♞",
        b : "♝",
        q : "♛",
        k : "♚",
        P : "♙",
        R : "♖",
        N : "♘",
        B : "♗",
        Q : "♕",
        K : "♔",

    }

    return unicode[piece.type] || ""
}

socket.on("playerRole" , function(role){
      
      playerRole =role;
      renderBoard()
})

socket.on("spectatorRole" , function(){
      
      playerRole = null;
      renderBoard();
})

socket.on("boardState" , function(fen){
     
       chess.load(fen);        
       renderBoard();
})

socket.on("move" , function(move){
     
       chess.move(move);
     
       renderBoard();
})

renderBoard();