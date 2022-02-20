import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
import { useState } from 'react';

const socket = io.connect('http://localhost:4000');

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("Join Room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div class="joinChatContainer">
        <h1>Join a Chat?</h1>
        <input type='text' placeholder='Bayu...' onChange={(i) => {setUsername(i.target.value)}} />
        <input type='text' placeholder='Room ID...' onChange={(i) => {setRoom(i.target.value)}}  />
        <button onClick={joinRoom}>Join a Room</button>
      </div>
      )
      :(
      <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
