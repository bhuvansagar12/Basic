import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './home_bg.png'; // Make sure to replace this with the actual path to your image
import collegeLogo from './college-logo.png';

const AuthenticatedPage = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh',
      width: '100vw',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '10px',
        position: 'absolute',
        top: 0,
        width: '100%'
      }}>
        <img src={collegeLogo} alt="College Logo" style={{ 
          height: '100px', // Adjust the height as needed
          marginLeft: '20px' 
        }} />
        <ul style={{ 
          listStyle: 'none', 
          display: 'flex', 
          gap: '20px', 
          margin: 0 ,
          marginRight: '30px'
        }}>
          <li>
            <Link to="/contact" style={{ color: 'black', textDecoration: 'none',fontSize: '20px',fontWeight: 'bold' }}>Contact Info</Link>
          </li>
          <li>
            <Link to="/student/all" style={{ color: 'black', textDecoration: 'none',fontSize: '20px',fontWeight: 'bold' }}>Students</Link>
          </li>
        </ul>
      </nav>
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <h1> </h1>
      </div>
    </div>
  );
};

export default AuthenticatedPage;
