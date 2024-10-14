# Chess Game with Socket.io

## 🎮 Overview

A real-time multiplayer chess game built using **Node.js**, **Express**, **Socket.io**, and **Chess.js**. Two players can compete in a chess match, while others can join as spectators. The game automatically handles moves, detects checkmate and draw conditions, and provides an option to start a new game.

---

## ✨ Features

- **Two-player game**: One player controls the white pieces, the other controls the black pieces.
- **Spectator mode**: Extra users become spectators once the game reaches two players.
- **Real-time moves**: The game board updates in real-time for all connected players.
- **Checkmate and draw detection**: Alerts are shown when the game ends with a win or draw.
- **New Game Button**: Easily restart the game with a fresh board.

---

## 📜 Prerequisites

To run this project, you'll need:

- **Node.js** (Download from [Node.js website](https://nodejs.org/))
- **npm** (comes bundled with Node.js)

---

## 🚀 How to Run

### 1. Clone or Download the Project

```bash
git clone <repository-url>
cd <project-directory>
## 🚀 How to Run

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
node app.js
```

The server will start listening on [http://localhost:3000](http://localhost:3000).

### 4. Access the Game

Open your browser and visit:

[http://localhost:3000](http://localhost:3000)

---

## 📁 File Structure

- **app.js** – The backend server handling socket connections.
- **chessgame.js** – Client-side logic for rendering the chessboard and handling moves.
- **index.ejs** – The frontend template rendered by Express.
- **public/style.css** – (Optional) Custom styles for the chessboard and UI.

---

## ⚙️ How the Game Works

### 🕹️ Join the Game

- The first user becomes the **white player**.
- The second user becomes the **black player**.
- Additional users are placed in **spectator mode**.

### 🔄 Drag and Drop to Move Pieces

- Players can only move their own pieces.
- Moves are validated in real-time using the **Chess.js** library.

### 🏁 End Conditions

- If a player **checkmates** the opponent, an alert shows the winner.
- If the game ends in a **draw**, all players are notified.

### 🔁 Start a New Game

- Once the game ends, the "Start New Game" button will become visible.
- Click it to reset the board and start fresh.

---

## 💻 Technologies Used

- **Node.js** – Backend server.
- **Express** – Web framework for Node.js.
- **Socket.io** – Real-time communication between players.
- **Chess.js** – Chess logic and move validation.
- **EJS** – Template engine for rendering HTML.

---

## 🖼️ Screenshots

(Optional: Add images of the chessboard and gameplay in action.)

---

## 🔮 Future Improvements

- ⏳ Add a **timer** for each player's move.
- ⏪ Implement **move history** and **undo** feature.
- 🔐 Add **login** for persistent games with player names.

---

## 📜 License

Feel free to use or modify this code for learning and educational purposes! 🎓

---

Enjoy playing chess! ♟️
