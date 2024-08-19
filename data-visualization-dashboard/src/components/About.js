// src/components/About.js
import React from 'react';

const About = () => {
  return (
    <div style={aboutContainerStyle}>
      <div style={profileSectionStyle}>
        <img
          src="/Users/navneetsagar/Desktop/blackcoffer_react/data-visualization-dashboard/src/components/navneet.jpeg" 
          alt="Profile"
          style={profilePhotoStyle}
        />
        <div style={profileInfoStyle}>
          <h2 style={nameStyle}>Navneet Sagar</h2>
          <p style={professionStyle}>Full Stack Developer</p>
          <p style={descriptionStyle}>
            I am a Full Stack Developer with experience in various projects, including a sophisticated Recommendation System, a Parcel Address Management System, and a Stock Price Predictor. I have been actively involved in the ISTE Society and Paryavaran Welfare Society at Thapar Institute Of Engineering and Technology, where I demonstrated strong organizational and technical skills. My projects involve using technologies such as Django, PostgreSQL, and Python, showcasing my ability to build robust web applications and machine learning models.
          </p>
        </div>
      </div>
      <div style={linksSectionStyle}>
        <a href="https://www.linkedin.com/in/navneet-sagar-b65024259/" target="_blank" rel="noopener noreferrer">
          <img src="data:image/png;base64,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" alt="LinkedIn" style={socialIconStyle} />
        </a>
        <a href="https://github.com/sagar09navneet" target="_blank" rel="noopener noreferrer">
          <img src="data:image/png;base64,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" alt="GitHub" style={socialIconStyle} />
        </a>
        <a href="https://www.instagram.com/09n.sagar/?next=%2F" target="_blank" rel="noopener noreferrer">
          <img src="data:image/jpeg;base64,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" alt="Instagram" style={socialIconStyle} />
        </a>
      </div>
    </div>
  );
};

const aboutContainerStyle = {
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const profileSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  maxWidth: '800px',
  marginBottom: '2rem',
};

const profilePhotoStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  marginRight: '1rem',
};

const profileInfoStyle = {
  maxWidth: '600px',
};

const nameStyle = {
  fontSize: '2rem',
  margin: '0',
};

const professionStyle = {
  fontSize: '1.25rem',
  color: '#666',
  margin: '0.5rem 0',
};

const descriptionStyle = {
  fontSize: '1rem',
  color: '#333',
};

const linksSectionStyle = {
  display: 'flex',
  gap: '1rem',
};

const socialIconStyle = {
  width: '40px',
  height: '40px',
};

export default About;
