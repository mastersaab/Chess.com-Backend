const socket = io(); // Connect to backend
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null; 
// Stores the player's role (white, black, or spectator)
// Renders the chessboard based on the current game state
const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = ""; // Clear the board

    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                // Handle drag start for valid pieces
                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                // Reset state on drag end
                pieceElement.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            // Allow dropping pieces on the square
            squareElement.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            // Handle piece drop and execute the move
            squareElement.addEventListener("drop", function (e) {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSource);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });

    // Flip the board if the player is black
    if (playerRole === "b") {
        boardElement.classList.add("flipped");
    } else {
        boardElement.classList.remove("flipped");
    }
};


//  Handles move execution and sends it to the backend
const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q', // Promote to queen by default
    };
    socket.emit("move", move); // Send the move to the backend
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', // White pieces
        'p': '♙', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚'  // Black pieces
    };
    return unicodePieces[piece.type] || "";
};

// Sets the player's role and renders the board
socket.on("playerRole", function (role) {
    playerRole = role;
    renderBoard();
});

// Sets the role to spectator and renders the board
socket.on("spectatorRole", function () {
    playerRole = null;
    renderBoard();
});

// Updates the board with the latest FEN string
socket.on("boardState", function (fen) {
    chess.load(fen); // Load the game state
    renderBoard();   // Re-render the board
});

// Handles game over scenarios and shows the "New Game" button
socket.on("gameOver", function (data) {
    if (data.result === "checkmate") {
        alert(`Checkmate! ${data.winner} wins the game.`);
    } else if (data.result === "draw") {
        alert("The game ended in a draw.");
    }

    // Disable further moves and show the "New Game" button
    playerRole = null; // Prevent further moves
    document.getElementById("newGameBtn").style.display = "block";
    renderBoard(); // Re-render the board
});

// Starts a new game and hides the "New Game" button
document.getElementById("newGameBtn").addEventListener("click", function () {
    socket.emit("newGame"); // Request a new game from the server
    this.style.display = "none"; // Hide the button
});

// Render the board on initial load
renderBoard();

// Example test events (commented out)
// socket.emit("churan"); // Send a test message to the backend
// socket.on("churan papdi", function () {
//     console.log("churan papdi received");
// });
