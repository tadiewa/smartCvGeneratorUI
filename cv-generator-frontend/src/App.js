import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    experience: '',
    targetJob: ''
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post('http://localhost:8093/api/cv/generate', formData);
      setResponse(res.data);
    } catch (err) {
      setResponse({ content: 'Error generating CV. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      padding: 0,
      margin: 0
    }}>
      {/* If response exists, show side-by-side sections */}
      {response ? (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.5rem',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1100,
          marginTop: 40
        }}>
          {/* Form Section */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '2.5rem 2rem',
            minWidth: 350,
            maxWidth: 400,
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: '#2d3a4b',
              letterSpacing: '0.5px'
            }}>Smart CV & Cover Letter Generator</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input name="name" placeholder="Name" onChange={handleChange} style={inputStyle} required />
              <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} style={inputStyle} required />
              <input name="experience" placeholder="Experience" onChange={handleChange} style={inputStyle} required />
              <input name="targetJob" placeholder="Target Job" onChange={handleChange} style={inputStyle} required />
              <button type="submit" style={buttonStyle} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
            </form>
          </div>
          {/* Generated Content Section */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            padding: '2rem',
            minWidth: 350,
            maxWidth: 600,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <h3 style={{ color: '#2d3a4b', fontSize: '1.3rem', marginBottom: 16, borderBottom: '1px solid #e0eafc', paddingBottom: 8, width: '100%' }}>
              Generated Content
            </h3>
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#3a4a5d',
              fontSize: 16,
              background: '#f6fafd',
              borderRadius: 8,
              padding: '1.2rem',
              width: '100%',
              marginBottom: 0
            }}>{response.content}</pre>
            {response.pdfDownloadLink && (
              <a href={`http://localhost:8093${response.pdfDownloadLink}`} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, marginTop: 18 }}>
                Download PDF
              </a>
            )}
          </div>
        </div>
      ) : (
        // Show only the form centered if no response yet
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem',
          maxWidth: 400,
          width: '100%',
          marginTop: 40
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#2d3a4b',
            letterSpacing: '0.5px'
          }}>Smart CV & Cover Letter Generator</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input name="name" placeholder="Name" onChange={handleChange} style={inputStyle} required />
            <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} style={inputStyle} required />
            <input name="experience" placeholder="Experience" onChange={handleChange} style={inputStyle} required />
            <input name="targetJob" placeholder="Target Job" onChange={handleChange} style={inputStyle} required />
            <button type="submit" style={buttonStyle} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
          </form>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '0.7rem 1rem',
  border: '1px solid #cfd8dc',
  borderRadius: 6,
  fontSize: 15,
  outline: 'none',
  background: '#f7fafc',
  color: '#2d3a4b',
  transition: 'border 0.2s',
};

const buttonStyle = {
  padding: '0.7rem 1rem',
  background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 8,
  transition: 'background 0.2s',
};

const linkStyle = {
  display: 'inline-block',
  marginTop: 12,
  color: '#6a82fb',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 15,
};

export default App;
