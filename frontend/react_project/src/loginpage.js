import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './login_bg.jpg';
import axios from 'axios';
import Modal from 'react-modal';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [maxUserId, setMaxUserId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaxUserId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/users');
        const users = response.data;
        const maxId = Math.max(...users.map(user => user.userId), 0);
        setMaxUserId(maxId);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchMaxUserId();
  }, []);

  const validateGmail = (email) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginErrorMessage('');

    if (!validateGmail(username)) {
      setLoginErrorMessage('Please enter a valid Gmail address.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/user/users');
      const users = response.data;

      const authenticatedUser = users.find(user => user.userName === username && user.password === password);

      if (authenticatedUser) {
        onLogin();
        navigate('/authenticated');
        setUsername('');
        setPassword('');
      } else {
        setLoginErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoginErrorMessage('Failed to authenticate. Please try again later.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpErrorMessage('');
    setSuccessMessage('');

    if (!validateGmail(username)) {
      setSignUpErrorMessage('Please enter a valid Gmail address.');
      return;
    }

    if (!validatePassword(password)) {
      setSignUpErrorMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      setSignUpErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/user/users');
      const users = response.data;

      const existingUser = users.find(user => user.userName === username);
      if (existingUser) {
        setSignUpErrorMessage('Username already exists. Please choose a different Gmail address.');
        return;
      }

      const signUpResponse = await axios.post('http://localhost:8080/user/signup', {
        userId: maxUserId + 1,
        userName: username,
        password: password,
      });

      if (signUpResponse.status === 201) {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        // setIsSignUpModalOpen(false);
        setSuccessMessage('User signed up successfully!');
        setMaxUserId(maxUserId + 1);
      } else {
        setSignUpErrorMessage('Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setSignUpErrorMessage('Failed to sign up. Please try again later.');
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
          marginLeft: '700px',
        }}
      >
        
      <h3 style={{ fontStyle: 'italic', textDecoration: 'underline' }}>LOGIN</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={username}
              placeholder="username (Gmail only)"
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

        {loginErrorMessage && <p style={{ color: 'red' }}>{loginErrorMessage}</p>}

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
              height: '400px', // Adjusted height for better fit
              margin: 'auto',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            },
          }}
        >
          <button
            onClick={() => setIsSignUpModalOpen(false)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          <h3>Sign Up</h3>
          <form onSubmit={handleSignUpSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={username}
                placeholder="username (Gmail only)"
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
            <div style={{ marginBottom: '10px' }}>
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

          {signUpErrorMessage && <p style={{ color: 'red' }}>{signUpErrorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </Modal>
      </div>
    </div>
  );
};

export default LoginPage;