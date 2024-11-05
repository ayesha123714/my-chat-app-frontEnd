import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './pages/Login'; 
import Chatroom from './pages/Chatroom';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* <Route path="/" element={<SignUp />} />
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/Chat" element={<Chat/>} /> */
    //     <Route path="/" element={<Login />} />
    //     <Route path="/Chatroom" element={<Chatroom />} }
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Chatroom" element={<Chatroom />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>

  );
}

export default App;
