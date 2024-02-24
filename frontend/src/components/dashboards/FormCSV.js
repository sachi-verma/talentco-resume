//entire code present in ResumeTemplate.js, ie, partly modal and partly just dynamic form
//keeping only the pure modal form here
//add ResumeTemplate.js to App.js to see what's in there
import React, { useState } from 'react';
import '../../css/multistep.css';
import { Form, Card, Button, ProgressBar, ListGroup, Modal, Badge, Row, Col, Container, Nav, Navbar } from 'react-bootstrap';
import EducationModalForm from '../modal-forms/EducationModal'
import ExperienceModalForm from '../modal-forms/ExperienceModal'
import CertificationsModalForm from '../modal-forms/CertificationsModal'
import SkillsModal from '../modal-forms/SkillsModal'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import axios from 'axios';
import { Helmet } from 'react-helmet';


  
function FormCSV() {
  const [formData, setFormData] = useState({
    keySkills: '',
    summary: '',
    industry: '',
    currentLocation: '',
    experience: '',
    currentDesignation: '',
    ugDegree: '',
    ugSpecialization: '',
    pgDegree: '',
    pgSpecialization: '',
    candName: '',
    functionalArea: '',
    currentCompany: '',
    preferredLocation: '',
    annualSalary: '',
    noticePeriod: '',
    dob: '',
    age: '',
    maritalStatus: '',
    phone: '',
    email: '',
    gender: '',
    workPermit: '',
    resume: null,
  });

  const mappedData = {
    skills: formData.keySkills,
    summary: formData.summary,
    industry: formData.industry,
    current_location: formData.currentLocation,
    experience: formData.experience,
    current_designation: formData.currentDesignation,
    ug_degree: formData.ugDegree,
    ug_spl: formData.ugSpecialization,
    pg_degree: formData.pgDegree,
    pg_spl: formData.pgSpecialization,
    cand_name: formData.candName,
    func_area: formData.functionalArea,
    current_company: formData.currentCompany,
    preferred_location: formData.preferredLocation,
    annual_salary: formData.annualSalary,
    notice_period: formData.noticePeriod,
    dob: formData.dob,
    age: formData.age,
    marital_status: formData.maritalStatus,
    phone: formData.phone,
    email: formData.email,
    gender: formData.gender,
    work_permit: formData.workPermit,
    resume: formData.resume,
  };

  const handleConstantFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic
    // console.log(formData);
    try {
        await axios.post('http://localhost:3002/submit-form-csv', mappedData);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again later.');
      }
  };

  return (
    <>
    <Helmet>
        <title>Talentco | Resume Form</title>
    </Helmet>
    <Navbar collapseOnSelect expand="lg" id="navbar1" variant="dark" sticky="top">  
        <Container>  
          <Navbar.Brand href="#" style={{fontSize: 18}}>
            <img src="img/Picture2_small.png" alt="brand-logo" height="35" width="25" style={{marginRight: '7px'}}/>
            TalentCo Resume Management
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
              {/* <Nav.Link href="#features">Link 1</Nav.Link>  
              <Nav.Link href="#pricing">Link 2</Nav.Link>    */}
            </Nav>  
            <Nav variant="pills" activeKey="1">
              <Nav.Link eventKey="1" href="http://localhost:3000/dynamicform" style={{margin: '5px', backgroundColor: "#d71728"}}>Resume Form</Nav.Link>  
              <Nav.Link eventKey="2" href="http://localhost:3000/filter" style={{margin: '5px'}}>View Resumes</Nav.Link>
              <Nav.Link eventKey="3" href="http://localhost:3000/upload" style={{margin: '5px'}}>Upload Resumes</Nav.Link>  
              {/* <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>
              <Nav.Link eventKey="3" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>     */}
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>  
     
    <div className="d-flex align-items-center justify-content-center" id="background">
    <Card style={{ width: '80rem', padding: '10px', marginTop: '40px', marginBottom: '40px' }} className="text-center" id="card">
      <h1 style={{align: 'center'}}>Resume Form</h1>
      <div className='align-items-start justify-content-start '>
      {/* <form onSubmit={handleSubmit} style={{margin: 'auto'}}> */}
      <ListGroup>
        {/* Constant Fields */}
{/* ---------------------------------------------------------------------------------------------- */}
        {/* PERSONAL DETAILS */}

        {/* <Container>
        <ListGroup.Item variant="primary" style={{height: '50px'}}>
            <h5 style={{marginTop: '7px', fontSize: '18px'}}>Personal Details</h5>
        </ListGroup.Item>
        </Container> */}
         <br/>
         
        <Row style={{marginRight: '30px'}}>
            <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}> Key Skills: </label></Col>
            <Col><input type="text" name="keySkills" value={formData.keySkills} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
            <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}> Summary: </label ></Col>
            <Col><input type="text" name="summary" value={formData.summary} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
            <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}> Industry:</label></Col>
            <Col><input type="text" name="industry" value={formData.industry} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
            <Col sm={6}>
            <Row style={{margin: '5px'}}>   
            <Col><label style={{textAlign: 'right'}}>Current Location:</label></Col>
            <Col><input type="text" name="currentLocation" value={formData.currentLocation} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
          </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Experience: <br/> (in years)</label></Col>
          <Col><input type="text" name="experience" value={formData.experience} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Current Designation:</label></Col>
          <Col><input type="text" name="currentDesignation" value={formData.currentDesignation} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Undergraduate Degree:</label></Col>
          <Col><input type="text" name="ugDegree" value={formData.ugDegree} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
           <Col> <label style={{textAlign: 'right'}}>Undergraduate Specialization:</label></Col>
          <Col><input type="text" name="ugSpecialization" value={formData.ugSpecialization} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Postgraduate Degree:</label></Col>
          <Col><input type="text" name="pgDegree" value={formData.pgDegree} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Postgraduate Specialization:</label></Col>
          <Col><input type="text" name="pgSpecialization" value={formData.pgSpecialization} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Name:</label></Col>
          <Col><input type="text" name="candName" value={formData.candName} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Functional Area:</label></Col>
          <Col><input type="text" name="functionalArea" value={formData.functionalArea} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Current Company:</label></Col>
          <Col><input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Preferred Location:</label></Col>
          <Col><input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Annual Salary:</label></Col>
          <Col><input type="text" name="annualSalary" value={formData.annualSalary} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Notice Period: <br/> (days)</label></Col>
          <Col><input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
          <Col><label style={{textAlign: 'right'}}> Date of birth:</label></Col>
          <Col><input type="date" name="dob" value={formData.dob} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Age:</label></Col>
          <Col><input type="text" name="age" value={formData.age} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Marital Status:</label></Col>
          <Col><input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Phone Number:</label></Col>
          <Col><input type="text" name="phone" value={formData.phone} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>Email:</label></Col>
          <Col><input type="text" name="email" value={formData.email} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Gender:</label></Col>
            <Col><select name="gender" value={formData.gender} onChange={handleConstantFieldChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row style={{margin: '5px'}}>
        <Col><label style={{textAlign: 'right'}}>USA Work Permit?</label></Col>
          <Col><input type="text" name="workPermit" value={formData.workPermit} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
        </Row>

        

        {/* <label>Willing to Relocate?
        <input type="checkbox" name="willingToRelocate" style={{height:15, width: 15, marginLeft: 10}} checked={formData.willingToRelocate} onChange={(e) => handleConstantCheckboxChange(e)} />
        </label>  */}
        
        <label style={{marginLeft: 80}}> Upload your Resume: 
        <input style={{marginLeft: 10}} type="file" name="resume" onChange={handleFileChange} />
        </label>
        
        
        {/* Add other constant fields similarly */}
        
        {/* <button type="submit">Submit</button> */}
        
        </ListGroup> 
        <Button variant="danger" className='align-items-center justify-content-center' onClick={handleSubmit} style={{width: '100px'}}>Submit</Button>

      {/* </form> */}
      </div>
    </Card>
    </div>
    </>
  );
}

export default FormCSV;
 