// components/ResumeBuilder.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './ResumeBuilder.css';
import { Container, Nav, Navbar} from 'react-bootstrap';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    candidate_name: '',
    email: '',
    phone: '',
    // location: '',
    // qualification: '',
    // current_role: '',
    // ctc: '',
    // linkedin: '',
    
    // Add more fields as needed
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // window.location.reload(false);

    try {
      await axios.post('http://localhost:3001/api/resumes', formData);
      alert('Resume submitted successfully!');
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Error submitting resume. Please try again.');
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
   <div>
  <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="">TalentCo Resume Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Link href="/form">Resume Form</Nav.Link>
            <Nav.Link href="/filter">View Resumes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
      <form onSubmit={handleSubmit}>
      <h2>Submit your profile</h2>
      <div className='d-flex justify-content-end'>
      <button type="signup" className='btn btn-info' onClick={navigateToLogin}>Go To Login</button>
      </div>

      <div className='mb-2'>
          <label id='label1'>
            Candidate Name:
            <input
              id='input1'
              type="text"
              name="candidate_name"
              value={formData.candidate_name}
              onChange={handleInputChange}
              
            />
          </label>
        </div>

        <div className='mb-2'>
          <label id='label1'>
            Email: 
            <input
              id='input1'
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div className='mb-2'>
          <label id='label1'>
            Phone: 
            <input
              id='label1'
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* <div className='mb-2'>
          <label id='label1'>
            Location:
            <input
              id='input1'
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              
            />
          </label>
        </div>

        <div className='mb-2'>
          <label id='label1'>
            Qualification:
            <input
              id='input1'
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              
            />
          </label>
        </div>

        <div className='mb-2'>
          <label id='label1'>
            Current Role:
            <input
              id='input1'
              type="text"
              name="current_role"
              value={formData.current_role}
              onChange={handleInputChange}
              
            />
          </label>
        </div>

        <div className='mb-2'>
          <label id='label1'>
            Current CTC:
            <input
              id='input1'
              type="text"
              name="ctc"
              value={formData.ctc}
              onChange={handleInputChange}
              
            />
          </label>
        </div>

        <div className='mb-2'>
          <label id='label1'>
            LinkedIn:
            <input
              id='input1'
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              
            />
          </label>
        </div> */}
        {/* Add more input fields as needed */}
        <button type="submit" className='btn btn-success'>Submit Resume</button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default ResumeBuilder;
