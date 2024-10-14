Chess Game with Socket.io
This is a real-time multiplayer chess game built using Node.js, Express, Socket.io, and Chess.js. It allows two players to play chess (one as white and one as black), while others can join as spectators. The game automatically handles moves, detects checkmate and draw conditions, and provides an option to start a new game.

Features
Two-player game: One player is white, and the other is black.
Spectator mode: If more than two users join, they become spectators.
Real-time moves: Updates the board state in real-time for all connected players.
Checkmate and draw detection: Displays alerts when the game ends.
New Game Button: Allows restarting the game.
Prerequisites
Node.js (Download from Node.js website)
npm (Comes bundled with Node.js)
How to Run
Clone or Download the Project:

bash
Copy code
git clone <repository-url>
cd <project-directory>
Install Dependencies:

bash
Copy code
npm install
Run the Server:

bash
Copy code
node app.js
The server will start listening on http://localhost:3000

Access the Game: Open your browser and go to:

arduino
Copy code
http://localhost:3000
File Structure
app.js – The main backend server with socket connections.
chessgame.js – Client-side logic for rendering the chessboard and handling moves.
index.ejs – The frontend template rendered by Express.
public/style.css – (Optional) Add your custom styles for the chessboard and UI.
How the Game Works
Join the game:

The first user becomes the white player.
The second user becomes the black player.
Additional users join as spectators.
Drag and Drop to Move Pieces:

Players can only move their own pieces.
Moves are validated in real-time using the Chess.js library.
End Conditions:

If a player checkmates the opponent, an alert shows the winner.
If the game ends in a draw, all players get notified.
Start a New Game:

When the game is over, the "Start New Game" button becomes visible. Click it to reset the board.
Technologies Used
Node.js – Backend server
Express – Web framework for Node.js
Socket.io – Real-time communication between players
Chess.js – Handles chess logic and move validation
EJS – Template engine for rendering HTML
Screenshots (Optional)
Add images of the chessboard and gameplay to show how it looks in action.
Future Improvements (Optional)
Add a timer for each player’s move.
Implement move history and undo feature.
Add login for persistent games with player names.
License
Feel free to use or modify the code for learning purposes! 🎓

Enjoy playing chess! ♟️
