// src/App.js
import React, { useState } from 'react';
import Chart from './components/charts';
import Filters from './components/Filters';
import Topic from './components/topic';
import Year from './components/year';
import Likelihood from './components/likelihoood';
import Likelihoodcountry from './components/relevance';
import About from './components/About';

// Navigation Bar Component
const NavBar = () => (
  <nav style={navStyle}>
    <div style={leftStyle}>
      <h1>Blackcoffer</h1>
    </div>
    <div style={centerStyle}>
      <input
        type="text"
        placeholder="Search..."
        style={searchBarStyle}
      />
    </div>
    <div style={rightStyle}>
      <img
        src="data:image/png;base64,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" // Replace with the path to your user logo image
        alt="User Logo"
        style={logoStyle}
      />
    </div>
  </nav>
);

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#333',
  color: '#fff',
  padding: '1rem',
};

const leftStyle = {
  flex: 1,
};

const centerStyle = {
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
};

const rightStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
};

const searchBarStyle = {
  width: '100%',
  padding: '0.5rem',
  borderRadius: '4px',
  border: 'none',
};

const logoStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
};

const App = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={filtersBoxStyle}>
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div style={{ flex: 1, padding: '1rem' }}>
          <div style={boxContainerStyle}>
            <div style={boxStyle}>
              <div style={headingStyle}>CountryCounts</div>
              <Chart filters={filters} />
            </div>
            <div style={boxStyle}>
              <div style={headingStyle}>Topic</div>
              <Topic filters={filters} />
            </div>
            <div style={boxStyle}>
              <div style={headingStyle}>Mean of intensity and relevance of different Regions</div>
              <Likelihood filters={filters} />
            </div>
            <div style={boxStyle}>
              <div style={headingStyle}>Year VS Country</div>
              <Year filters={filters} />
            </div>
            <div style={boxStyle}>
              <div style={headingStyle}> Mean Likelihood VS Country</div>
              <Likelihoodcountry filters={filters} />
            </div>
            <div style={boxStyle}>
              <div style={headingStyle}> About:</div>
              <About filters={filters} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const filtersBoxStyle = {
  width: '250px',
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  height: '100%',
  marginRight: '1rem',
};

const boxContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px', // Adds 40px gap between each box
};

const boxStyle = {
  border: '5px solid #000000',
  borderRadius: '8px',
  padding: '1rem',
  backgroundColor: '#fff',
  position: 'relative',
  overflow: 'hidden',
};

const headingStyle = {
  color: '#007bff', // Blue color
  fontWeight: 'bold',
  fontStyle: 'italic',
  position: 'absolute',
  
  top: '10px',
  left: '10px', // Changed to top-left corner
};

export default App;
