import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './login_bg.jpg';
import axios from 'axios';
import Modal from 'react-modal';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.get('http://localhost:8080/user/users');
      const users = response.data;

      const authenticatedUser = users.find(user => user.userName === username && user.password === password);

      if (authenticatedUser) {
        onLogin(); // Update the authentication state
        navigate('/authenticated');
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('Failed to authenticate. Please try again later.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/signup', {
        userId: 6,
        userName: username,
        password: password,
      });

      if (response.status === 200) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setIsSignUpModalOpen(false);
        setSuccessMessage('User signed up successfully!');
      } else {
        setErrorMessage('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('Failed to sign up. Please try again later.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          marginLeft: '700px', // Move the login box to the right
        }}
      >
        <h3>LOGIN</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                margin: '5px 0',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                flex: '1',
                marginRight: '5px',
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsSignUpModalOpen(true)}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#008CBA',
                color: 'white',
                cursor: 'pointer',
                flex: '1',
                marginLeft: '5px',
              }}
            >
              Sign Up
            </button>
          </div>
        </form>

        <Modal
          isOpen={isSignUpModalOpen}
          onRequestClose={() => setIsSignUpModalOpen(false)}
          contentLabel="Sign Up Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              width: '400px',
              height: '300px',
              margin: 'auto',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <h3>Sign Up</h3>
          <form onSubmit={handleSignUpSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                placeholder="re-enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Sign Up
            </button>
          </form>
        </Modal>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;



















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import backgroundImage from './login_bg.jpg';
// import axios from 'axios';
// import Modal from 'react-modal';

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     try {
//       const response = await axios.get('http://localhost:8080/user/users');
//       const users = response.data;

//       const authenticatedUser = users.find(user => user.userName === username && user.password === password);

//       if (authenticatedUser) {
//         onLogin(); // Update the authentication state
//         navigate('/authenticated');
//         setUsername('');
//         setPassword('');
//       } else {
//         setErrorMessage('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setErrorMessage('Failed to authenticate. Please try again later.');
//     }
//   };

//   const handleSignUpSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8080/user/signup', {
//         userId: 6,
//         userName: username,
//         password: password,
//       });

//       if (response.status === 200) {
//         setUsername('');
//         setPassword('');
//         setConfirmPassword('');
//         setIsSignUpModalOpen(false);
//         setSuccessMessage('User signed up successfully!');
//       } else {
//         setErrorMessage('Failed to sign up. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during sign-up:', error);
//       setErrorMessage('Failed to sign up. Please try again later.');
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         height: '100vh',
//         width: '100vw',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           padding: '20px',
//           borderRadius: '10px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           maxWidth: '400px',
//           width: '100%',
//           textAlign: 'center',
//         }}
//       >
//         <h3>LOGIN</h3>

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: '10px' }}>
//             {/* <label>Username:</label> */}
//             <input
//               type="text"
//               value={username}
//               placeholder="username"
//               onChange={(e) => setUsername(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 margin: '5px 0',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             {/* <label>Password:</label> */}
//             <input
//               type="password"
//               value={password}
//               placeholder="password"
//               onChange={(e) => setPassword(e.target.value)}
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 margin: '5px 0',
//                 borderRadius: '4px',
//                 border: '1px solid #ccc',
//               }}
//             />
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//             <button
//               type="submit"
//               style={{
//                 padding: '10px 20px',
//                 borderRadius: '4px',
//                 border: 'none',
//                 backgroundColor: '#4CAF50',
//                 color: 'white',
//                 cursor: 'pointer',
//                 flex: '1',
//                 marginRight: '5px',
//               }}
//             >
//               Login
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsSignUpModalOpen(true)}
//               style={{
//                 padding: '10px 20px',
//                 borderRadius: '4px',
//                 border: 'none',
//                 backgroundColor: '#008CBA',
//                 color: 'white',
//                 cursor: 'pointer',
//                 flex: '1',
//                 marginLeft: '5px',
//               }}
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <Modal
//           isOpen={isSignUpModalOpen}
//           onRequestClose={() => setIsSignUpModalOpen(false)}
//           contentLabel="Sign Up Modal"
//           style={{
//             overlay: {
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             },
//             content: {
//               width: '400px',
//               height: '300px',
//               margin: 'auto',
//               padding: '20px',
//               borderRadius: '10px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             },
//           }}
//         >
//           <h3>Sign Up</h3>
//           <form onSubmit={handleSignUpSubmit}>
//             <div style={{ marginBottom: '10px' }}>
//               <label>Username:</label>
//               <input
//                 type="text"
//                 value={username}
//                 placeholder="username"
//                 onChange={(e) => setUsername(e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '8px',
//                   margin: '5px 0',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               />
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <label>Password:</label>
//               <input
//                 type="password"
//                 value={password}
//                 placeholder="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '8px',
//                   margin: '5px 0',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               />
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <label>Confirm Password:</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 placeholder="re-enter password"
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '8px',
//                   margin: '5px 0',
//                   borderRadius: '4px',
//                   border: '1px solid #ccc',
//                 }}
//               />
//             </div>
//             <button
//               type="submit"
//               style={{
//                 padding: '10px 20px',
//                 borderRadius: '4px',
//                 border: 'none',
//                 backgroundColor: '#4CAF50',
//                 color: 'white',
//                 cursor: 'pointer',
//                 width: '100%',
//               }}
//             >
//               Sign Up
//             </button>
//           </form>
//         </Modal>

//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;