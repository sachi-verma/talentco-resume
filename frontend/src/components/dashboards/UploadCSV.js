import React, { useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';



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
    <>
    <Helmet>
        <title>Talentco | Upload</title>
    </Helmet>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">  
        <Container>  
          <Navbar.Brand href="#" style={{fontSize: 18}}>
            <img src="img/Picture2_small.png" alt="brand-logo" height="30" width="25" style={{marginRight: '10px'}}/>
            TalentCo Resume Management
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
              {/* <Nav.Link href="#features">Link 1</Nav.Link>  
              <Nav.Link href="#pricing">Link 2</Nav.Link>    */}
            </Nav>  
            <Nav variant="pills" activeKey="3">
              <Nav.Link eventKey="1" href="http://localhost:3000/dynamicform" style={{margin: '5px'}}>Resume Form</Nav.Link>  
              <Nav.Link eventKey="2" href="http://localhost:3000/filter" style={{margin: '5px'}}>View Resumes</Nav.Link>  
              <Nav.Link eventKey="3" href="http://localhost:3000/upload" style={{margin: '5px'}}>Upload Resumes</Nav.Link>
              {/* <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>  
              <Nav.Link eventKey="3" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>  */}
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>
    <div className="d-flex align-items-center justify-content-center" id="background">
    <Card style={{ width: '80rem', padding: '10px', marginBottom: '40px' }} className="text-center" id="card">
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      </Card>
    </div>
    </>
  );
};

export default CSVUploadForm;