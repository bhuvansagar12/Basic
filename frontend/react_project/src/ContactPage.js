import React from 'react';
import mobilePhoto from './mobile_photo.jpg'; // Make sure to replace this with the actual path to your image

const ContactPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Information</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', padding: '10px' }}>
          <h2>Ramaiah Institute Of Technology</h2>
          <p>Mathikere, MSR Nagar</p>
          <p>Bangalore, 560054</p>
          <p>India</p>
          <p>Phone: +91 9900112233</p>
          <p>Fax: +1 (123) 456-7891</p>
          <p>Email: info@msrit.edu</p>
        </div>
        <div style={{ flex: '1 1 300px', padding: '10px' }}>
          <h2>Office Hours</h2>
          <p>Monday to Friday: 8:00 AM - 5:00 PM</p>
          <p>Saturday: 9:00 AM - 1:00 PM</p>
          <p>Sunday: Closed</p>

          <h2>Admissions Office</h2>
          <p>Phone: +91 8632600998</p>
          <p>Email: admissions@msrit.edu</p>
        </div>
        <div style={{ flex: '1 1 300px', padding: '10px' }}>
          <h2>Library</h2>
          <p>Phone: +1 (123) 456-7898</p>
          <p>Email: library@abccollege.edu</p>
        </div>
        <div style={{ flex: '1 1 300px', padding: '10px' }}>
          <img src={mobilePhoto} alt="Mobile" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
