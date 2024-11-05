// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// const Chat= () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState('');
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     // Redirect to login if no token
//     if (!token) {
//       navigate('/login');
//       return; 
//     }

//     // Decode the token to get the username
//     try {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setUsername(decodedToken.username);
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       navigate('/login');
//       return;
//     }

//     // Initialize socket connection
//     const socket = io('http://localhost:3000/api/users/login', {
//       auth: { token },
//     });

//     socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//       socket.emit('join');
//     });

//     socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));

//     socket.on('users', (users) => setUsers(Object.values(users)));

//     return () => {
//       socket.disconnect();
//       console.log('Socket disconnected');
//     };
//   }, [token, navigate]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       // Emit the message along with the username
//       const socket = io('http://localhost:3000/api/users/login');
//       socket.emit('message', { username, message });
//       setMessage('');
//     }
//   };

//   return (
//     <>
//       <h2>Chat</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}><strong>{msg.username}: </strong>{msg.message}</p>
//         ))}
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h3>Users Online:</h3>
//         <ul>
//           {users.map((user, index) => (
//             <li key={index}>{user}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chatroom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Assume token is stored after login
    const socket = io('http://localhost:3000', {
        auth: {
            token: localStorage.getItem('token'),  // Ensure you are passing the token if required
        },
    });

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return; // Prevent further execution if no token
        }

        // Listen for connection success
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('join');
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err.message);
        });

        // Set username from token (mock logic, replace with actual decode logic)
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUsername(decodedToken.username);

        // Listen for incoming messages
        socket.on('message', (msg) => {
            console.log('Received message:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Listen for the list of connected users
        socket.on('users', (users) => {
            console.log('Connected users:', users);
            setUsers(Object.values(users)); // Convert the users object into an array
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
            console.log('Socket disconnected');
        };
    }, [socket, token, navigate]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', { message });
            setMessage(''); // Clear the input after sending the message
        }
    };

    return (
        <div>
            <style>
                {`
          .chatroom {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            max-width: 600px;
            margin: auto;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            background-color: #f4f4f9;
          }

          .chatroom-header {
            text-align: center;
            margin-bottom: 20px;
          }

          .chatroom-body {
            flex: 1;
            display: flex;
            justify-content: space-between;
          }

          .chat-messages {
            width: 75%;
            max-height: 400px;
            overflow-y: auto;
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .message {
            margin-bottom: 10px;
          }

          .user-list {
            width: 20%;
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .chatroom-footer {
            display: flex;
            align-items: center;
          }

          input[type="text"] {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
          }

          button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }
        `}
            </style>

            <div className="chatroom">
                <div className="chatroom-header">
                    <h2>Welcome, {username}</h2>
                </div>
                <div className="chatroom-body">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">
                                <strong>{msg.username}</strong>: {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="user-list">
                        <h4>Online Users:</h4>
                        <ul>
                            {users.map((user, index) => (
                                <li key={index}>{user.username}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="chatroom-footer">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;