import React, { useState } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const CSVUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3002/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
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
    <Navbar collapseOnSelect expand="lg" id="navbar1" variant="dark" sticky="top" style={{height: '80px'}}>  
        <Container>  
          <Navbar.Brand href="#" id="navbrand" style={{fontSize: 18, color: '#101e45'}}>
            <img src="img/logo_small.png" alt="brand-logo" height="40" width="34" style={{marginRight: '10px'}}/>
            TalentCo Resume Management
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
              {/* <Nav.Link href="#features">Link 1</Nav.Link>  
              <Nav.Link href="#pricing">Link 2</Nav.Link>    */}
            </Nav>  
            <Nav variant="pills" activeKey="3">
              <Nav.Link eventKey="1" to="/form" style={{margin: '15px', color: '#101e45'}}>Resume Form</Nav.Link>  
              <Nav.Link eventKey="2" to="/filter" style={{margin: '15px', color: '#101e45'}}>View Resumes</Nav.Link>  
              <Nav.Link eventKey="3" to="/upload" style={{margin: '15px', backgroundColor: "#101e45"}}>Upload Resumes</Nav.Link>
              {/* <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>  
              <Nav.Link eventKey="3" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>  */}
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>
    <div className="d-flex align-items-center justify-content-center" id="background" style={{height: '50vh'}}>
    <Card style={{ width: '80rem', padding: '10px', marginBottom: '40px' }} className="text-center" id="card">
      <h2>Upload CSV File</h2>
      <p>*Note: Only CSV files allowed</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </Card>
    </div>
    </>
  );
};

export default CSVUploadForm;

// const CSVUploadForm = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please select a file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('http://localhost:3002/upload-csv', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('CSV file uploaded successfully.');
//     } catch (error) {
//       console.error('Error uploading CSV file:', error);
//       alert('An error occurred while uploading the CSV file.');
//     }
//   };

//   return (
//     <>
    // <Helmet>
    //     <title>Talentco | Upload</title>
    // </Helmet>
    // <Navbar collapseOnSelect expand="lg" id="navbar1" variant="dark" sticky="top">  
    //     <Container>  
    //       <Navbar.Brand href="#" style={{fontSize: 18}}>
    //         <img src="img/Picture2_small.png" alt="brand-logo" height="30" width="25" style={{marginRight: '10px'}}/>
    //         TalentCo Resume Management
    //       </Navbar.Brand>  
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
    //       <Navbar.Collapse id="responsive-navbar-nav">  
    //         <Nav className="me-auto">  
    //           {/* <Nav.Link href="#features">Link 1</Nav.Link>  
    //           <Nav.Link href="#pricing">Link 2</Nav.Link>    */}
    //         </Nav>  
    //         <Nav variant="pills" activeKey="3">
    //           <Nav.Link eventKey="1" href="http://localhost:3000/form" style={{margin: '5px'}}>Resume Form</Nav.Link>  
    //           <Nav.Link eventKey="2" href="http://localhost:3000/filter" style={{margin: '5px'}}>View Resumes</Nav.Link>  
    //           <Nav.Link eventKey="3" href="http://localhost:3000/upload" style={{margin: '5px', backgroundColor: "#d71728"}}>Upload Resumes</Nav.Link>
    //           {/* <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>  
    //           <Nav.Link eventKey="3" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>  */}
    //         </Nav>  
    //       </Navbar.Collapse>  
    //     </Container>  
    //   </Navbar>
//     <div className="d-flex align-items-center justify-content-center" id="background">
//     <Card style={{ width: '80rem', padding: '10px', marginBottom: '40px' }} className="text-center" id="card">
//       <h2>Upload CSV File</h2>
//       <p>*Note: Only CSV files allowed</p>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       </Card>
//     </div>
//     </>
//   );
// };

// export default CSVUploadForm;
