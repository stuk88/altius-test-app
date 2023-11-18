import React, { useState } from 'react';

const websiteList = ['fo1.altius.finance', 'fo2.altius.finance'];

const CredentialForm = () => {
  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  const handleWebsiteChange = (event) => {
    setSelectedWebsite(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Assuming you have an API endpoint to send credentials
    const apiUrl = 'http://127.0.0.1:8000/api/crawl/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website: selectedWebsite,
          username,
          password,
        }),
      });

      if (response.status === 200) {
        // Successful response
        const data = await response.json();
        setToken(data.token);
        setErrorMessage('');
      } else if (response.status === 403) {
        // Credentials not correct
        setToken('');
        setErrorMessage('Credentials not correct');
      } else {
        // Handle other status codes as needed
        setToken('');
        setErrorMessage(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending credentials:', error);
      setToken('');
      setErrorMessage('Error sending credentials');
    }
  };

  return (
    <div>
      <h1>Credential Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select a website:
          <select value={selectedWebsite} onChange={handleWebsiteChange}>
            <option value="">Select a website</option>
            {websiteList.map((website) => (
              <option key={website} value={website}>
                {website}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {token && <p style={{ color: 'green' }}>Token: {token}</p>}
    </div>
  );
};

export default CredentialForm;
