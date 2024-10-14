const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");
const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();

let players = {};
let currentPlayer = 'W';

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Renders the index page when the root URL is accessed
app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

// Handles socket connections from clients
io.on("connection", function (uniquesocket) {
    console.log("connected");

    // Assigns a role (white/black/spectator) to the connected player
    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    } else {
        uniquesocket.emit("spectatorRole");
    }

    // Removes the player from the game upon disconnection
    uniquesocket.on("disconnect", function () {
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        }
    });

    // Processes and broadcasts valid moves to all clients
    uniquesocket.on("move", (move) => {
        try {
            // Ensures the correct player moves based on turn
            if (chess.turn() === 'w' && uniquesocket.id !== players.white) return;
            if (chess.turn() === 'b' && uniquesocket.id !== players.black) return;

            const result = chess.move(move);
            if (result) {
                currentPlayer = chess.turn(); // Updates the turn
                io.emit("move", move); // Broadcasts the move
                io.emit("boardState", chess.fen()); // Sends updated board state

                // Checks for checkmate and announces the winner
                if (chess.isCheckmate()) {
                    console.log("Checkmate detected!");
                    io.emit("gameOver", {
                        result: "checkmate",
                        winner: chess.turn() === 'w' ? "black" : "white"
                    });
                    return;
                }

                // Checks for draw and notifies players
                if (chess.isDraw()) {
                    io.emit("gameOver", { result: "draw" });
                    return;
                }
            } else {
                console.log("Invalid Move: ", move);
                uniquesocket.emit("invalidMove", move); // Notifies about invalid move
            }
        } catch (err) {
            console.log(err);
            uniquesocket.emit("invalidMove", "Invalid move: " + move); // Handles exceptions
        }
    });

    // Resets the game state and starts a new game
    uniquesocket.on("newGame", () => {
        chess.reset(); // Resets the chess game state
        io.emit("boardState", chess.fen()); // Sends the reset board to clients
        currentPlayer = 'w'; // Resets to white's turn
    });

    
    // uniquesocket.on("disconnect", function () {
    //     console.log("disconnected");
    // });

    // uniquesocket.on("churan", function (req, res) {
    //     io.emit("churan papdi"); // Sends a test message to all clients
    // });
});

// Starts the server and listens on port 3000
server.listen(3000, function (req, res) {
    console.log("listening on port 3000");
});
