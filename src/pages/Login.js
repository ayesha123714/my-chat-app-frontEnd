// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Login = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //         const { data } = await axios.post('http://localhost:3000/api/users/login', {username,password});
    
// //         if (data.access_token) {
// //             localStorage.token = data.access_token;
// //             navigate('/chat'); 
// //         }
// //     } catch {
// //         setError('Credentials are invalid');
// //     }
// // };

// // return (
// //     <div>
// //         <h2>Login</h2>
// //         <form onSubmit={handleLogin}>
// //             <input
// //                 type="text"
// //                 placeholder="Username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //             />
// //             <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //             />
// //             <button type="submit">Login</button>
// //         </form>
// //         {error && <p>{error}</p>}
// //         <p>
// //             Don't have an account? <a href="/signup">Sign up</a>
// //         </p>
// //     </div>
// // );
// // }

// // export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(''); 
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('http://localhost:3000/api/users/login', { username, password });
            
//             if (data.access_token) {
//                 localStorage.token = data.access_token; 
//                 navigate('/chat');
//             }
//         } catch (err) {
//             setError('Invalid credentials.'); // Set error message
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {error && <p>{error}</p>} {/* Display error message if it exists */}
//             <p>
//                 Don't have an account? <a href="/signup">Sign up</a>
//             </p>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to your backend login API
      const res = await axios.post('http://localhost:3000/api/users/login', { 
        username,  
        password   
      });
      
      const { accessToken, user } = res.data;
  
      if (accessToken) {
  
        
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        alert('Successfully logged in!');
        navigate('/Chatroom');
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
          style={styles.input} // Style input
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          style={styles.input} // Style input
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.text}>
        Want to create a new user? 
        <span 
          style={styles.link} 
          onClick={() => navigate('/signup')} // Redirect to signup page
        >
          Click here
        </span>
      </p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  text: {
    marginTop: '15px',
    color: '#555',
  },
  link: {
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Login;