
import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    region: '',
    sector: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input type="text" name="end_year" placeholder="End Year" onChange={handleChange} style={inputStyle} />
      <input type="text" name="topic" placeholder="Topic" onChange={handleChange} style={inputStyle} />
      <input type="text" name="region" placeholder="Region" onChange={handleChange} style={inputStyle} />
      <input type="text" name="sector" placeholder="Sector" onChange={handleChange} style={inputStyle} />
      <input type="text" name="pestle" placeholder="PESTLE" onChange={handleChange} style={inputStyle} />
      <input type="text" name="source" placeholder="Source" onChange={handleChange} style={inputStyle} />
      <input type="text" name="swot" placeholder="SWOT" onChange={handleChange} style={inputStyle} />
      <input type="text" name="country" placeholder="Country" onChange={handleChange} style={inputStyle} />
      <input type="text" name="city" placeholder="City" onChange={handleChange} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Apply Filters</button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  marginBottom: '0.5rem',
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
};

export default Filters;
