import React, { useState } from 'react';
import axios from 'axios';

const CSVUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://your-backend-url/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('CSV file uploaded successfully.');
    } catch (error) {
      console.error('Error uploading CSV file:', error);
      alert('An error occurred while uploading the CSV file.');
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CSVUploadForm;
