//entire code present in ResumeTemplate.js, ie, partly modal and partly just dynamic form
//keeping only the pure modal form here
//add ResumeTemplate.js to App.js to see what's in there
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" id="navbar1" className="nav" style={{height: '80px'}}>  
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
            <Nav activeKey="1">
              <NavLink eventKey="1" to="/form" style={{margin: '15px', marginTop: '20px', color: '#d71728', textDecoration: 'none'}}>Resume Form</NavLink>  
              <NavLink className="nav-link" eventKey="2" to="/filter" style={{margin: '15px', color: '#101e45', textDecoration: 'none'}}>View Resumes</NavLink>  
              <NavLink eventKey="3" to="/upload" style={{margin: '15px', marginTop: '20px', color: '#101e45', textDecoration: 'none'}}>Upload Resumes</NavLink>
              {/* <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>  
              <Nav.Link eventKey="3" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>  */}
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
            {/* <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}> Industry:</label></Col>
            <Col><input type="text" name="industry" value={formData.industry} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col> */}
            <Col sm={6}>
            <Row style={{margin: '5px'}}>
            <Col><label style={{textAlign: 'right'}}>Industry:</label></Col>
            <Col><select name="industry" value={formData.industry} onChange={handleConstantFieldChange} style={{width: '200px'}}>
                <option value="">Select Industry</option>
                <option value="Analytics / KPO / Research   ">Analytics / KPO / Research   </option>
                <option value="BPO / Call Centre">BPO / Call Centre</option>
                <option value="IT Services & Consulting">IT Services & Consulting</option>
                <option value="Electronic Components / Semiconductors">Electronic Components / Semiconductors</option>
                <option value="Electronics Manufacturing">Electronics Manufacturing</option>
                <option value="Emerging Technologies">Emerging Technologies</option>
                <option value="Hardware & Networking">Hardware & Networking</option>
                <option value="Internet">Internet</option>
                <option value="Software Product">Software Product</option>
                <option value="Banking">Banking</option>
                <option value="Financial Services">Financial Services</option>
                <option value="FinTech / Payments">FinTech / Payments</option>
                <option value="Insurance">Insurance</option>
                <option value="Investment Banking / Venture Capital / Private Equity">Investment Banking / Venture Capital / Private Equity</option>
                <option value="NBFC">NBFC</option>
                <option value="Education / Training">Education / Training</option>
                <option value="E-Learning / EdTech">E-Learning / EdTech</option>
                <option value="Automobile">Automobile</option>
                <option value="Auto Components">Auto Components</option>
                <option value="Building Material">Building Material</option>
                <option value="Chemicals">Chemicals</option>
                <option value="Defence & Aerospace">Defence & Aerospace</option>
                <option value="Electrical Equipment">Electrical Equipment</option>
                <option value="Fertilizers / Pesticides / Agro chemicals">Fertilizers / Pesticides / Agro chemicals</option>
                <option value="Industrial Automation">Industrial Automation</option>
                <option value="Industrial Equipment / Machinery">Industrial Equipment / Machinery</option>
                <option value="Iron & Steel">Iron & Steel</option>
                <option value="Metals & Mining">Metals & Mining</option>
                <option value="Packaging & Containers">Packaging & Containers</option>
                <option value="Petrochemical / Plastics / Rubber">Petrochemical / Plastics / Rubber</option>
                <option value="Pulp & Paper">Pulp & Paper</option>
                <option value="Aviation">Aviation</option>
                <option value="Courier / Logistics">Courier / Logistics</option>
                <option value="Engineering & Construction">Engineering & Construction</option>
                <option value="Oil & Gas">Oil & Gas</option>
                <option value="Ports & Shipping">Ports & Shipping</option>
                <option value="Power">Power</option>
                <option value="Railways">Railways</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Urban Transport">Urban Transport</option>
                <option value="Water Treatment / Waste Management">Water Treatment / Waste Management</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Beverage">Beverage</option>
                <option value="Consumer Electronics & Appliances">Consumer Electronics & Appliances</option>
                <option value="Fitness & Wellness">Fitness & Wellness</option>
                <option value="FMCG">FMCG</option>
                <option value="Food Processing  ">Food Processing </option>
                <option value="Furniture & Furnishing">Furniture & Furnishing</option>
                <option value="Gems & Jewellery">Gems & Jewellery</option>
                <option value="Hotels & Restaurants">Hotels & Restaurants</option>
                <option value="Leather">Leather</option>
                <option value="Retail">Retail</option>
                <option value="Textile & Apparel">Textile & Apparel</option>
                <option value="Travel & Tourism">Travel & Tourism</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Clinical Research / Contract Research">Clinical Research / Contract Research</option>
                <option value="Medical Services / Hospital">Medical Services / Hospital</option>
                <option value="Medical Devices & Equipment">Medical Devices & Equipment</option>
                <option value="Pharmaceutical & Life Sciences">Pharmaceutical & Life Sciences</option>
                <option value="Advertising & Marketing ">Advertising & Marketing </option>
                <option value="Animation & VFX">Animation & VFX</option>
                <option value="Events / Live Entertainment">Events / Live Entertainment</option>
                <option value="Film / Music / Entertainment">Film / Music / Entertainment</option>
                <option value="Gaming">Gaming</option>
                <option value="Printing & Publishing">Printing & Publishing</option>
                <option value="Sports / Leisure & Recreation">Sports / Leisure & Recreation</option>
                <option value="Telecom / ISP">Telecom / ISP</option>
                <option value="TV / Radio">TV / Radio</option>
                <option value="Architecture / Interior Design">Architecture / Interior Design</option>
                <option value="Accounting / Auditing">Accounting / Auditing</option>
                <option value="Content Development / Language">Content Development / Language</option>
                <option value="Design">Design</option>
                <option value="Facility Management Services ">Facility Management Services   </option>
                <option value="Law Enforcement / Security Services">Law Enforcement / Security Services</option>
                <option value="Legal">Legal</option>
                <option value="Recruitment / Staffing">Recruitment / Staffing</option>
                <option value="Management Consulting">Management Consulting</option>
                <option value="Agriculture / Forestry / Fishing">Agriculture / Forestry / Fishing</option>
                <option value="Government / Public Administration">Government / Public Administration</option>
                <option value="Import & Export">Import & Export</option>
                <option value="NGO / Social Services / Industry Associations">NGO / Social Services / Industry Associations</option>
                <option value="Miscellaneous">Miscellaneous</option>


            </select></Col>
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
 