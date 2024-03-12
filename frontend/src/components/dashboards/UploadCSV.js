import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Nav, Navbar, Card, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import '../../css/multistep.css';



const CSVUploadForm = () => {
  const [file, setFile] = useState(null);

  //------------------------------------------
  const [csvList, setCSVList] = useState([]);
  useEffect(() => {
    fetchCSVList();
  }, []);

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
      const response = await axios.post('http://localhost:3002/api/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('CSV file uploaded successfully.');
      // Reload the page
      window.location.reload();
      // setCSVList([...csvList, response.data]);
      fetchCSVList(); // Fetch updated CSV list after upload
    } catch (error) {
      console.error('Error uploading CSV file:', error);
      alert('An error occurred while uploading the CSV file.');
    }
  };

  const fetchCSVList = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/csv-files');
      const formattedCSVList = response.data.map(csv => ({
        ...csv,
        uploaded_at: formatDate(csv.uploaded_at) // Format the date
    }));
      // setCSVList(response.data);
      setCSVList(formattedCSVList);
    } catch (error) {
      console.error('Error fetching CSV list:', error);
    }
  };

  // Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds} <br/> ${day}/${month}/${year}`;
};

  const handleViewCSV = (filename) => {
    window.open(`http://localhost:3002/api/view-csv/${filename}`, '_blank');
  };

  const handleDownloadCSV = (filename) => {
    window.open(`http://localhost:3002/api/download-csv/${filename}`, '_blank');
  };

  const handleDeleteCSV = async (filename) => {
    try {
      await axios.delete(`http://localhost:3002/api/delete-csv/${filename}`);
      setCSVList(csvList.filter(csv => csv.filename !== filename));
      alert('CSV file deleted successfully.');
    } catch (error) {
      console.error('Error deleting CSV file:', error);
      alert('An error occurred while deleting the CSV file.');
    }
  };

  return (
    <>
    <Helmet>
        <title>Talentco | Upload</title>
    </Helmet>
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" id="navbar2" className="nav" style={{height: '80px'}}>  
        <Container>  
          <Navbar.Brand href="#" style={{fontSize: 18, color: '#101e45'}}>
            <img src="img/logo_small.png" alt="brand-logo" height="40" width="34" style={{marginRight: '10px'}}/>
            TalentCo Resume Management
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
              {/* <Nav.Link href="#features">Link 1</Nav.Link>  
              <Nav.Link href="#pricing">Link 2</Nav.Link>    */}
            </Nav>  
            <Nav activeKey="3">
              <NavLink eventKey="1" to="/" style={{margin: '15px', marginTop: '20px', color: '#101e45', textDecoration: 'none'}}>Resume Form</NavLink>  
              <NavLink className="nav-link" eventKey="2" to="/filter" style={{margin: '15px', color: '#101e45', textDecoration: 'none'}}>View Resumes</NavLink>  
              <NavLink eventKey="3" to="/upload" style={{margin: '15px', marginTop: '20px', color: '#d71728', textDecoration: 'none'}}>Upload Resumes</NavLink>
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

    <Container>
        <h2>Uploaded CSV Files</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {csvList.map((csv, index) => (
              <tr key={index}>
                <td>{csv.filename}</td>
                {/* <td>{csv.uploaded_at}</td> */}
                <td dangerouslySetInnerHTML={{ __html: csv.uploaded_at }}></td> {/* Use dangerouslySetInnerHTML to render HTML */}
                <td>
                  {/* <button onClick={() => handleViewCSV(csv.filename)}>View</button> */}
                  <button style={{margin: '5px'}} onClick={() => handleDownloadCSV(csv.filename)}>Download</button>
                  <button style={{margin: '5px'}} onClick={() => handleDeleteCSV(csv.filename)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
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
