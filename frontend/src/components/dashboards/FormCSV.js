//entire code present in ResumeTemplate.js, ie, partly modal and partly just dynamic form
//keeping only the pure modal form here
//add ResumeTemplate.js to App.js to see what's in there
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/multistep.css';
import { Form, Card, Button, ProgressBar, ListGroup, Modal, Badge, Row, Col, Container, Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import EducationModalForm from '../modal-forms/EducationModal'
import ExperienceModalForm from '../modal-forms/ExperienceModal'
import CertificationsModalForm from '../modal-forms/CertificationsModal'
import SkillsModal from '../modal-forms/SkillsModal'
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset, faEnvelope, faLocationDot, faAngleDown, faBars, faUser, faBriefcase, faRectangleList, faGraduationCap, faCaretRight, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faFacebookF, faYoutube, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope as regularEnvelope } from '@fortawesome/free-regular-svg-icons';
  
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

   // Validation state for each field
   const [validationErrors, setValidationErrors] = useState({
    candName: false,
    phone: false,
    email: false,
    // Other form fields...
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

  const [errors, setErrors] = useState({
    candName: false,
    phone: false,
    email: false,
    // Other form fields...
  });

  const handleConstantFieldChange = (e) => {
    const { name, value } = e.target;
    // console.log('Name:', name);
    // console.log('Value:', value);
    setFormData({ ...formData, [name]: value });
   
  };

  const isFormValid = () => {
    return (
        formData.candName.trim() !== '' && 
        formData.email.trim() !== '' && 
        formData.phone.trim() !== ''
    );
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  if (file) {
    setFormData({ ...formData, resume: file });
    setSelectedFile(file);
    setSelectedName(file.name);
  } else {
    // Handle the case where no file is selected
    console.error("No file selected");
  }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check if any validation errors exist
     const isValid = Object.values(validationErrors).every((error) => !error);

     const hasError = Object.values(errors).some(error => error);
     
    //if (isFormValid) {
        // Perform form submission logic
        // console.log(formData);
        try {
        const formData = new FormData();
        formData.append('resume', selectedFile);
        await axios.post('http://localhost:3002/submit-form-csv', mappedData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(mappedData)
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again later.');
      }
    //}else {
        // Show error message or handle validation errors
        //alert('Please fill in all required fields.');   
      //}
   
  };

    const [showAbout, setShowAbout] = useState(false);
    const showAboutDropdown = (e)=>{
        setShowAbout(!showAbout);
    }
    const hideAboutDropdown = e => {
        setShowAbout(false);
    }

    const [showServices, setShowServices] = useState(false);
    const showServicesDropdown = (e)=>{
        setShowServices(!showServices);
    }
    const hideServicesDropdown = e => {
        setShowServices(false);
    }

    const [showJobs, setShowJobs] = useState(false);
    const showJobsDropdown = (e)=>{
        setShowJobs(!showJobs);
    }
    const hideJobsDropdown = e => {
        setShowJobs(false);
    }

    const [showBlogs, setShowBlogs] = useState(false);
    const showBlogsDropdown = (e)=>{
        setShowBlogs(!showBlogs);
    }
    const hideBlogsDropdown = e => {
        setShowBlogs(false);
    }

  return (
    <>
    <Helmet>
        <title>Talentco | Resume Form</title>
    </Helmet>

    <Navbar id="navbar1"  className="navhide" style={{height: "55px"}}>
      <Container>
        <Navbar.Brand style={{marginLeft: '0px', marginRight: '0px'}} className="ml-auto">
            <a href="tel:+91 77382 49852" id="nav1header" style={{textDecoration: 'none'}}><FontAwesomeIcon icon={faHeadset} style={{color: "#ffffff", marginRight: '10px', fontSize: '15px'}} />
            +91 77382 49852</a>
            <a href="mailto:info@talentcohr.com" id="nav1header"  style={{textDecoration: 'none'}}><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff", marginRight: '10px', fontSize: '15px'}} />info@talentcohr.com</a>
            <a href="https://maps.app.goo.gl/YW4RxGDjGfZ99jqZ9" id="nav1header"  style={{textDecoration: 'none'}}><FontAwesomeIcon icon={faLocationDot} style={{color: "#ffffff", marginRight: '10px', fontSize: '15px'}} />Mulund West, Mumbai - 80</a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a id="nav1header" href="https://www.linkedin.com/company/talentco-hr-services-llp/"><FontAwesomeIcon icon={faLinkedin} style={{color: "#ffffff", fontSize: '15px'}} /></a>
            <a id="nav1header" href="https://www.facebook.com/TalentCo.HR.Services"><FontAwesomeIcon icon={faFacebookF} style={{color: "#ffffff", fontSize: '15px'}} /></a>
            <a id="nav1header" href="https://www.youtube.com/channel/UCIFgRBahZc0LF6vylZ8Y1Ig"><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff", fontSize: '15px'}} /></a>
            <a id="nav1header" href="https://www.instagram.com/talentco.hr.services/"><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff", fontSize: '15px'}} /></a>
            <a id="nav1header" href="https://api.whatsapp.com/send/?phone=919987596852&text&type=phone_number&app_absent=0"><FontAwesomeIcon icon={faWhatsapp} style={{color: "#ffffff", fontSize: '15px'}} /></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" id="navbar2" className="nav" style={{height: '110px'}}>  
        <Container>  
          <Navbar.Brand style={{fontSize: 18, color: '#101e45'}}>
            <a href="https://talentcohr.com/"><img src="img/Talentco-logo-01.jpg" alt="brand-logo" height="50" width="180" style={{marginRight: '10px'}}/></a>
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ borderStyle: 'none', height: '30px'}}> <FontAwesomeIcon icon={faEllipsisVertical} style={{color: '#02224d', fontSize: '20px'}}/><FontAwesomeIcon icon={faEllipsisVertical} style={{color: '#02224d', fontSize: '20px'}}/><FontAwesomeIcon icon={faEllipsisVertical} style={{color: '#02224d', fontSize: '20px'}}/> </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav" class="navbar-collapse">  
            <Nav className="me-auto">  
              <Nav.Link href="https://talentcohr.com/" style={{color: '#42558c', marginLeft: '30px', fontSize: '18px'}} id="nav2header">Home</Nav.Link>
              {/* <NavLink className="nav-link" to="/filter" style={{margin: '15px', color: '#101e45', textDecoration: 'none'}}>View Resumes</NavLink>   */}

              <NavDropdown className="border-0 rounded-0" style={{color: '#42558c', marginLeft: '20px', fontSize: '18px', fontWeight: 'bold'}} title={<span className="my-auto" style={{color: '#42558c'}}>About Us<FontAwesomeIcon icon={faAngleDown} style={{marginLeft: '5px', fontSize: '11px'}}/></span>} show={showAbout} onMouseEnter={showAboutDropdown} onMouseLeave={hideAboutDropdown} id="nav2header" >
                <NavDropdown.Item className="border-0 rounded-0" href="https://talentcohr.com/why-talentco/" style={{fontSize: '17px', width:'200px'}} id="nav2item">Why TalentCo</NavDropdown.Item>
                <NavDropdown.Item href="https://talentcohr.com/ab-start/" style={{fontSize: '17px'}} id="nav2item">AB Start</NavDropdown.Item>
                <NavDropdown.Item href="https://talentcohr.com/our-clients/" style={{fontSize: '17px'}} id="nav2item">Our Clients</NavDropdown.Item>
                <NavDropdown.Item href="https://talentcohr.com/leadership-team/" style={{fontSize: '17px'}} id="nav2item">Leadership Team</NavDropdown.Item>
                <NavDropdown.Item href="https://talentcohr.com/advisory-board/" style={{fontSize: '17px'}} id="nav2item">Advisory Board</NavDropdown.Item>
                <NavDropdown.Item href="https://talentcohr.com/life-at-talentco/" style={{fontSize: '17px'}} id="nav2item">Life at TalentCo</NavDropdown.Item>
                <NavDropdown.Item href="https://talentcohr.com/csr/" style={{fontSize: '17px'}} id="nav2item">CSR</NavDropdown.Item>
              </NavDropdown>  

              <NavDropdown style={{color: '#42558c', marginLeft: '5px', fontSize: '18px', fontWeight: 'bold'}} title={<span className="my-auto" style={{color: '#42558c'}}>Our Services<FontAwesomeIcon icon={faAngleDown} style={{marginLeft: '5px', fontSize: '11px'}}/></span>} show={showServices} onMouseEnter={showServicesDropdown} onMouseLeave={hideServicesDropdown} id="nav2header" >
              <NavDropdown.Item href="https://talentcohr.com/hr-consulting-services/" style={{fontSize: '17px', width:'200px'}} id="nav2item">Consulting & <br/> Advisory Services – <br/> HR, IR & ER</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/recruitment/" style={{fontSize: '17px'}} id="nav2item">Talent Acquisition <br/> Services</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/contract-staffing/" style={{fontSize: '17px'}} id="nav2item">Contract Staffing <br/> Solutions</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/compliance-liaison/" style={{fontSize: '17px'}} id="nav2item">Payroll & <br/> Compliance Services</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/training-development/" style={{fontSize: '17px'}} id="nav2item">Training & <br/> Development</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/women-leadership-coaching-training/" style={{fontSize: '17px'}} id="nav2item">POSH Consulting <br/>& Training</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/our-services/" style={{fontSize: '17px'}} id="nav2item">View All Services</NavDropdown.Item> 
              </NavDropdown>  

              <NavDropdown style={{color: '#101e45', marginLeft: '5px', fontSize: '18px', fontWeight: 'bold'}} title={<span className="my-auto" style={{color: '#101e45'}}>Job Seekers<FontAwesomeIcon icon={faAngleDown} style={{marginLeft: '5px', fontSize: '11px'}}/></span>} show={showJobs} onMouseEnter={showJobsDropdown} onMouseLeave={hideJobsDropdown} id="nav2header" >
              <NavDropdown.Item href="https://jobs.talentcohr.com/category.php" style={{fontSize: '17px', width:'200px'}} id="nav2item">Apply Now</NavDropdown.Item>
              <NavDropdown.Item href="" style={{fontSize: '17px'}} id="nav2item">Send Your Resume</NavDropdown.Item>
              <NavDropdown.Item href="https://jobs.talentcohr.com/view_closed_jobs.php" style={{fontSize: '17px'}} id="nav2item">Positions Worked On</NavDropdown.Item>
              </NavDropdown>  

              <NavDropdown style={{color: '#42558c', marginLeft: '5px', fontSize: '18px', fontWeight: 'bold'}} title={<span className="my-auto" style={{color: '#42558c'}}>Blogs<FontAwesomeIcon icon={faAngleDown} style={{marginLeft: '5px', fontSize: '11px'}}/></span>} show={showBlogs} onMouseEnter={showBlogsDropdown} onMouseLeave={hideBlogsDropdown} id="nav2header" >
              <NavDropdown.Item href="https://talentcohr.com/blog/" style={{fontSize: '17px', width:'200px'}} id="nav2item">Blog</NavDropdown.Item>
              <NavDropdown.Item href="https://talentcohr.com/magazines/" style={{fontSize: '17px'}} id="nav2item">Magazine</NavDropdown.Item>
              </NavDropdown>    
            </Nav>  
          </Navbar.Collapse>
          <Nav className="justify-content-end">
            <a href="https://talentcohr.com/contact-us/"><Button id="navbutton" className="border-0" style={{marginLeft: '70px', backgroundColor: '#02224d', fontSize: '18px'}}>Contact Us</Button></a>
              {/* <NavLink eventKey="1" to="/form" style={{margin: '15px', marginTop: '20px', color: '#d71728', textDecoration: 'none'}}>Resume Form</NavLink>  
              <NavLink className="nav-link" eventKey="2" to="/filter" style={{margin: '15px', color: '#101e45', textDecoration: 'none'}}>View Resumes</NavLink>  
              <NavLink eventKey="3" to="/upload" style={{margin: '15px', marginTop: '20px', color: '#101e45', textDecoration: 'none'}}>Upload Resumes</NavLink> */}
              {/* <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>  
              <Nav.Link eventKey="3" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>  */}
            </Nav>  
        </Container>  
      </Navbar>

    {/* <div>
      <Image src="img/cover_img.jpg" fluid />
      <div class="centered-text" >Send Your Resume</div>
    </div> */}
    <div class="wrapper">
	<div class="divimage"></div>
	    <div class="divtext">Send Your Resume</div>
    </div>
     
     <h5 style={{textAlign: 'center', marginTop: '50px'}}>───  Job Opportunities</h5>
     <h1 style={{textAlign: 'center', marginTop: '30px', color: '#42558c'}}>Apply Now For Your Dream Job!</h1>
     <p style={{textAlign: 'center'}}>We are committed to fulfilling your unique career needs. Fill out the form below & we’ll be in touch shortly</p>
     

    {/* <div className="d-flex align-items-center justify-content-center" id="background"> */}
    {/* <Card style={{ width: '80rem', padding: '10px', marginTop: '40px', marginBottom: '40px' }} className="text-center" id="card"> */}
      {/* <Row><h1 style={{align: 'center'}}>Resume Form</h1></Row> */}
      {/* <div className='align-items-start justify-content-start '> */}
      {/* <form onSubmit={handleSubmit} style={{margin: 'auto'}}> */}
      
        {/* Constant Fields */}

    <Container fluid>
    <Row md={1} lg={2}>


{/* ---------------------------------PERSONAL DETAILS---------------------------------------------------------- */}
        <Col>
          <Card className="border-0" id="card1" style={{margin: '15px', padding: '20px', alignItems: 'center', marginLeft: '20px', marginRight: '20px', minHeight: '335px'}}>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title style={{textAlign: 'center', fontSize: '25px', color: '#42558c', marginBottom: '10px'}}><FontAwesomeIcon icon={faUser} style={{color: "#101e45", marginRight: '10px'}} />PERSONAL DETAILS</Card.Title>
              <Card.Text>
              <Col className="mx-auto">
                <Row sm={1} md={2}>
                {/* <Col><label style={{textAlign: 'right'}}>Name:</label></Col> */}
                <Col><input placeholder="Full Name" type="text" name="candName" value={formData.candName} onChange={handleConstantFieldChange}/>
                </Col>
                {/* </Row>
              </Col>

              <Col> 
                <Row >*/}
                {/* <Col><label style={{textAlign: 'right'}}> Date of <br/> birth:</label></Col> */}
                <Col><input type="text" placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")} name="dob" value={formData.dob} 
                onChange={handleConstantFieldChange} style={{width: '205px'}}/></Col>
                 {/* <Col><input type="date" name="dob" value={formData.dob} onChange={handleConstantFieldChange} style={{width: '205px'}}/></Col> */}
                </Row>
                 
                {/* </Col>

                <Col> */}
                    {/* <Row >
                    <Col><label style={{textAlign: 'right'}}>Age:</label></Col>
                <Col><input placeholder="Age" type="text" name="age" value={formData.age} onChange={handleConstantFieldChange} /></Col>
                </Row> */}
                {/* </Col>

                <Col> */}
                    <Row sm={1} md={2}>
                    {/* <Col><label style={{textAlign: 'right'}}>Phone <br/> Number:</label></Col> */}
                <Col><input placeholder="Phone" type="text" name="phone" value={formData.phone} onChange={handleConstantFieldChange} />
                </Col>
                {/* </Row>
                </Col>

                <Col > 
                <Row >*/}
                {/* <Col><label style={{textAlign: 'right'}}>Email:</label></Col> */}
                <Col><input placeholder="Email" type="text" name="email" value={formData.email} onChange={handleConstantFieldChange} />
                </Col>
                </Row>
                {/* </Col>

                <Col> */}
                    <Row sm={1} md={2}>
                    {/* <Col><label style={{textAlign: 'right'}}>Gender:</label></Col> */}
                    <Col><select name="gender" value={formData.gender} onChange={handleConstantFieldChange} style={{width: '205px'}}>
                        {/* <option value="" selected="selected" disabled="disabled">Select Gender</option> */}
                        <option value="0" style={{display: "none"}}>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select></Col>
                {/* </Row>
                </Col>

                <Col> 
                <Row >*/}
                {/* <Col><label style={{textAlign: 'right'}}>Marital <br/> Status:</label></Col> */}
                {/* <Col><input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleConstantFieldChange} /></Col> */}
                <Col><select name="maritalStatus" value={formData.industry} onChange={handleConstantFieldChange} style={{width: '205px'}}>
                {/* <option value="" selected="selected" disabled="disabled">Select Marital Status</option> */}
                <option value="0" style={{display: "none"}}>Select Marital Status</option>
                <option value="Single/Unmarried">Single/Unmarried</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
                <option value="Other">Other</option>

                </select>
                </Col>
                </Row>
                </Col>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

{/* -------------------------------------CURRENT JOB--------------------------------------------------------- */}
        <Col>
          <Card className="border-0" id="card1" style={{margin: '15px', padding: '20px', alignItems: 'center', marginLeft: '20px', marginRight: '20px'}}>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title style={{textAlign: 'center', fontSize: '25px', color: '#42558c', marginBottom: '10px'}}><FontAwesomeIcon icon={faBriefcase} style={{color: "#101e45", marginRight: '10px'}}/>CURRENT JOB DETAILS</Card.Title>
              <Card.Text>
                <Col className="mx-auto">
                    
            <Row sm={1} md={2}>
            {/* <Col><label style={{textAlign: 'right'}}>Industry:</label></Col> */}
            <Col ><select name="industry" value={formData.industry} onChange={handleConstantFieldChange} style={{width: '205px'}}>
                {/* <option value="" selected="selected" disabled="disabled">Select Industry</option> */}
                <option value="0" style={{display: "none"}}>Select Industry</option>
                  <option value="Accounting / Auditing">Accounting / Auditing</option>
                  <option value="Advertising and Marketing">Advertising and Marketing</option>
                  <option value="Agriculture / Forestry / Fishing">Agriculture / Forestry / Fishing</option>
                  <option value="Analytics / KPO / Research">Analytics / KPO / Research</option>
                  <option value="Animation and VFX">Animation and VFX</option>
                  <option value="Architecture / Interior Design">Architecture / Interior Design</option>
                  <option value="Auto Components">Auto Components</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Aviation">Aviation</option>
                  <option value="Banking">Banking</option>
                  <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="BPO / Call Centre">BPO / Call Centre</option>
                  <option value="Building Material">Building Material</option>
                  <option value="Chemicals">Chemicals</option>
                  <option value="Clinical Research / Contract Research">Clinical Research / Contract Research</option>
                  <option value="Consumer Electronics and Appliances">Consumer Electronics and Appliances</option>
                  <option value="Content Development / Language">Content Development / Language</option>
                  <option value="Courier / Logistics">Courier / Logistics</option>
                  <option value="Defence and Aerospace">Defence and Aerospace</option>
                  <option value="Design">Design</option>
                  <option value="E-Learning / EdTech">E-Learning / EdTech</option>
                  <option value="Education / Training">Education / Training</option>
                  <option value="Electrical Equipment">Electrical Equipment</option>
                  <option value="Electronic Components / Semiconductors">Electronic Components / Semiconductors</option>
                  <option value="Electronics Manufacturing">Electronics Manufacturing</option>
                  <option value="Emerging Technologies">Emerging Technologies</option>
                  <option value="Engineering and Construction">Engineering and Construction</option>
                  <option value="Events / Live Entertainment">Events / Live Entertainment</option>
                  <option value="Facility Management Services">Facility Management Services</option>
                  <option value="Fertilizers / Pesticides / Agro chemicals">Fertilizers / Pesticides / Agro chemicals</option>
                  <option value="Film / Music / Entertainment">Film / Music / Entertainment</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="FinTech / Payments">FinTech / Payments</option>
                  <option value="Fitness and Wellness">Fitness and Wellness</option>
                  <option value="FMCG">FMCG</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Furniture and Furnishing">Furniture and Furnishing</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Gems and Jewellery">Gems and Jewellery</option>
                  <option value="Government / Public Administration">Government / Public Administration</option>
                  <option value="Hardware and Networking">Hardware and Networking</option>
                  <option value="Hotels and Restaurants">Hotels and Restaurants</option>
                  <option value="Import and Export">Import and Export</option>
                  <option value="Industrial Automation">Industrial Automation</option>
                  <option value="Industrial Equipment / Machinery">Industrial Equipment / Machinery</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Internet">Internet</option>
                  <option value="Investment Banking / Venture Capital / Priva">Investment Banking / Venture Capital / Private Equity</option>
                  <option value="Iron and Steel">Iron and Steel</option>
                  <option value="IT Services and Consulting">IT Services and Consulting</option>
                  <option value="Law Enforcement / Security Services">Law Enforcement / Security Services</option>
                  <option value="Leather">Leather</option>
                  <option value="Legal">Legal</option>
                  <option value="Management Consulting">Management Consulting</option>
                  <option value="Medical Devices and Equipment">Medical Devices and Equipment</option>
                  <option value="Medical Services / Hospital">Medical Services / Hospital</option>
                  <option value="Metals and Mining">Metals and Mining</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                  <option value="NBFC">NBFC</option>
                  <option value="NGO / Social Services / Industry Associations">NGO / Social Services / Industry Associations</option>
                  <option value="Oil and Gas">Oil and Gas</option>
                  <option value="Packaging and Containers">Packaging and Containers</option>
                  <option value="Petrochemical / Plastics / Rubber">Petrochemical / Plastics / Rubber</option>
                  <option value="Pharmaceutical and Life Sciences">Pharmaceutical and Life Sciences</option>
                  <option value="Ports and Shipping">Ports and Shipping</option>
                  <option value="Power">Power</option>
                  <option value="Printing and Publishing">Printing and Publishing</option>
                  <option value="Pulp and Paper">Pulp and Paper</option>
                  <option value="Railways">Railways</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Recruitment / Staffing">Recruitment / Staffing</option>
                  <option value="Retail">Retail</option>
                  <option value="Software Product">Software Product</option>
                  <option value="Sports / Leisure and Recreation">Sports / Leisure and Recreation</option>
                  <option value="Telecom / ISP">Telecom / ISP</option>
                  <option value="Textile and Apparel">Textile and Apparel</option>
                  <option value="Travel and Tourism">Travel and Tourism</option>
                  <option value="TV / Radio">TV / Radio</option>
                  <option value="Urban Transport">Urban Transport</option>
                  <option value="Water Treatment / Waste Management">Water Treatment / Waste Management</option>



            </select></Col>
            {/*</Row>
             </Col>

            <Col> 
                <Row >*/}
                {/* <Col><label style={{textAlign: 'right'}}>Functional <br/> Area:</label></Col> */}
            {/* <Col><input type="text" name="functionalArea" value={formData.functionalArea} onChange={handleConstantFieldChange} style={{width: '170px'}}/></Col> */}
            <Col><select name="functionalArea" value={formData.functionalArea} onChange={handleConstantFieldChange} style={{width: '205px'}}>
                {/* <option value="" selected="selected" disabled="disabled">Select Functional Area</option> */}
                  <option value="0" style={{display: "none"}}>Select Functional Area</option>
                  <option value="Administration and Facilities">Administration and Facilities</option>
                  <option value="Aviation and Aerospace">Aviation and Aerospace</option>
                  <option value="BFSI, Investments and Trading">BFSI, Investments and Trading</option>
                  <option value="Construction and Site Engineering">Construction and Site Engineering</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Content, Editorial and Journalism">Content, Editorial and Journalism</option>
                  <option value="CSR and Social Service">CSR and Social Service</option>
                  <option value="Customer Success, Service and Operations">Customer Success, Service and Operations</option>
                  <option value="Data Science and Analytics">Data Science and Analytics</option>
                  <option value="Energy and Mining">Energy and Mining</option>
                  <option value="Engineering - Hardware and Networks">Engineering - Hardware and Networks</option>
                  <option value="Engineering - Software and QA">Engineering - Software and QA</option>
                  <option value="Environment Health and Safety">Environment Health and Safety</option>
                  <option value="Finance and Accounting">Finance and Accounting</option>
                  <option value="Food, Beverage and Hospitality">Food, Beverage and Hospitality</option>
                  <option value="Healthcare and Life Sciences">Healthcare and Life Sciences</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="IT and Information Security">IT and Information Security</option>
                  <option value="IT Software - Application Programme, Maintenance">IT Software - Application Programme, Maintenance</option>
                  <option value="IT Software - Client / Server Programming">IT Software - Client / Server Programming</option>
                  <option value="IT Software - DBA, Data warehousing">IT Software - DBA, Data warehousing</option>
                  <option value="IT Software - eCommerce, Internet Technologies">IT Software - eCommerce, Internet Technologies</option>
                  <option value="IT Software - Embed, EDA, VLSI, ASIC, Chip Design">IT Software - Embed, EDA, VLSI, ASIC, Chip Design</option>
                  <option value="IT Software - ERP, CRM">IT Software - ERP, CRM</option>
                  <option value="IT Software - Mainframe">IT Software - Mainframe</option>
                  <option value="IT Software - Middleware">IT Software - Middleware</option>
                  <option value="IT Software - Mobile">IT Software - Mobile</option>
                  <option value="IT Software - Other">IT Software - Other</option>
                  <option value="IT Software - QA and Testing">IT Software - QA and Testing</option>
                  <option value="IT Software - System Programming">IT Software - System Programming</option>
                  <option value="IT Software - Systems, EDP, MIS">IT Software - Systems, EDP, MIS</option>
                  <option value="IT Software - Telecom Software">IT Software - Telecom Software</option>
                  <option value="Legal and Regulatory">Legal and Regulatory</option>
                  <option value="Marketing and Communication">Marketing and Communication</option>
                  <option value="Media Production and Entertainment">Media Production and Entertainment</option>
                  <option value="Merchandising, Retail and eCommerce">Merchandising, Retail and eCommerce</option>
                  <option value="Other">Other</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Procurement and Supply Chain">Procurement and Supply Chain</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Production, Manufacturing and Engineering">Production, Manufacturing and Engineering</option>
                  <option value="Project and Program Management">Project and Program Management</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="Research and Development">Research and Development</option>
                  <option value="Risk Management and Compliance">Risk Management and Compliance</option>
                  <option value="Sales and Business Development">Sales and Business Development</option>
                  <option value="Security Services">Security Services</option>
                  <option value="Shipping and Maritime">Shipping and Maritime</option>
                  <option value="Sports, Fitness and Personal Care">Sports, Fitness and Personal Care</option>
                  <option value="Strategic and Top Management">Strategic and Top Management</option>
                  <option value="Teaching and Training">Teaching and Training</option>
                  <option value="UX, Design and Architecture">UX, Design and Architecture</option>

                
            </select></Col>
            </Row>
            {/* </Col>

            <Col> */}
            <Row sm={1} md={2}>
            {/* <Col><label style={{textAlign: 'right'}}>Current <br/> Company:</label></Col> */}
            <Col><input placeholder="Current Company" type="text" name="currentCompany" value={formData.currentCompany} onChange={handleConstantFieldChange} /></Col>
            {/* </Row>
            </Col>

            <Col> 
                <Row >*/}
                {/* <Col><label style={{textAlign: 'right'}}>Current <br/> Designation:</label></Col> */}
            <Col><input placeholder="Current Designation" type="text" name="currentDesignation" value={formData.currentDesignation} onChange={handleConstantFieldChange} /></Col>
            </Row>
            {/* </Col>

            <Col> */}
            <Row sm={1} md={2}>   
            {/* <Col><label style={{textAlign: 'right'}}>Current <br/> Location:</label></Col> */}
            <Col><input placeholder="Current Location" type="text" name="currentLocation" value={formData.currentLocation} onChange={handleConstantFieldChange} /></Col>
             {/* </Row>
           </Col>

            <Col> 
            <Row >*/}
            {/* <Col><label style={{textAlign: 'right'}}>Annual <br/> Salary:</label></Col> */}
            <Col><input placeholder="Annual Salary (eg: 100000)" type="text" name="annualSalary" value={formData.annualSalary} onChange={handleConstantFieldChange} /></Col>
            </Row>
            {/* </Col>

            <Col> */}
                <Row sm={1} md={2}>
                {/* <Col><label style={{textAlign: 'right'}}>Notice Period: <br/> (days)</label></Col> */}
            <Col><input placeholder="Notice Period (in days)" type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleConstantFieldChange} /></Col>
            {/* </Row>

            <Row > */}
                {/* <Col><label style={{textAlign: 'right'}}>Notice Period: <br/> (days)</label></Col> */}
            <Col> <input style={{marginLeft: 10, display: "none"}} type="file" id="files" name="resume" onChange={handleFileChange} placeholder="upload your resume" accept=".doc,.docx,.pdf"/>
            <button><label for="files">Upload Your Resume</label></button><p>{selectedName}</p>
            </Col>
            </Row>
            </Col>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>


{/* -------------------------PROFILE OVERVIEW-------------------------------------------------------------- */}

        <Col className='align-items-center justify-content-center'>
          <Card className="border-0" id="card1" style={{margin: '15px', padding: '20px', alignItems: 'center', marginLeft: '20px', marginRight: '20px'}}>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
            <Card.Title style={{textAlign: 'center', fontSize: '25px', color: '#42558c', marginBottom: '10px'}}><FontAwesomeIcon icon={faRectangleList} style={{color: "#101e45", marginRight: '10px'}}/>PROFILE OVERVIEW</Card.Title>
              <Card.Text>
              <Col className="mx-auto">
                <Row sm={1} md={2}>
                {/* <Col><label style={{textAlign: 'right'}}>Experience: <br/> (in years)</label></Col> */}
                <Col><input placeholder="Experience (in years)" type="number" name="experience" value={formData.experience} onChange={handleConstantFieldChange} /></Col>
                {/* </Row>
                </Col>

                <Col>
                <Row > */}
                {/* <Col><label style={{textAlign: 'right'}}> Summary: </label ></Col> */}
                <Col><input placeholder="Summary" type="text" name="summary" value={formData.summary} onChange={handleConstantFieldChange} /></Col>
                </Row>
                {/* </Col>

                <Col> */}
                <Row >
                {/* <Col><label style={{textAlign: 'right'}}> Key Skills: </label></Col> */}
                <Col><input placeholder="Skills separated by commas" type="text" name="keySkills" value={formData.keySkills} onChange={handleConstantFieldChange} id="commafield"/></Col>
                </Row>
                {/* </Col>

                <Col> */}
                <Row >
                {/* <Col><label style={{textAlign: 'right'}}>Preferred <br/> Location:</label></Col> */}
                <Col><input placeholder="Preferred Locations separated by commas" type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleConstantFieldChange} id="commafield"/></Col>
                </Row>
                </Col>

                {/* <Col>
                <Row style={{margin: '5px'}}>
                <Col><label style={{textAlign: 'right'}}>USA Work <br/> Permit?</label></Col>
                <Col><select name="workPermit" value={formData.workPermit} onChange={handleConstantFieldChange} style={{width: '170px'}}>
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select></Col>
                </Row>
                </Col> */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

{/* ----------------------------------------------------------------------------------------------------- */}

        <Col>
          <Card className="border-0" id="card1" style={{margin: '15px', padding: '20px', alignItems: 'center', marginLeft: '20px', marginRight: '20px', minHeight: '260px'}}>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
            <Card.Title style={{textAlign: 'center', fontSize: '25px', color: '#42558c', marginBottom: '10px'}}><FontAwesomeIcon icon={faGraduationCap} style={{color: "#101e45", marginRight: '10px'}}/>EDUCATION DETAILS</Card.Title>
              <Card.Text>
              <Col className="mx-auto">
                <Row sm={1} md={2}>
                {/* <Col><label style={{textAlign: 'right'}}>Undergraduate <br/> Degree:</label></Col> */}
                <Col><input placeholder="Undergraduate Degree" type="text" name="ugDegree" value={formData.ugDegree} onChange={handleConstantFieldChange} /></Col>
                {/* </Row>
                </Col>

                <Col >
                    <Row > */}
                {/* <Col> <label style={{textAlign: 'right'}}>Undergraduate <br/> Specialization:</label></Col> */}
                <Col><input placeholder="Undergraduate Specialization" type="text" name="ugSpecialization" value={formData.ugSpecialization} onChange={handleConstantFieldChange} /></Col>
                </Row>
                {/* </Col>

                <Col> */}
                <Row sm={1} md={2}>
                {/* <Col><label style={{textAlign: 'right'}}>Postgraduate <br/> Degree:</label></Col> */}
                <Col><input placeholder="Postgraduate Degree" type="text" name="pgDegree" value={formData.pgDegree} onChange={handleConstantFieldChange} /></Col>
                {/* </Row>
                </Col>

                <Col>
                    <Row > */}
                    {/* <Col><label style={{textAlign: 'right'}}>Postgraduate <br/> Specialization:</label></Col> */}
                <Col><input placeholder="Postgraduate Specialization" type="text" name="pgSpecialization" value={formData.pgSpecialization} onChange={handleConstantFieldChange} /></Col>
                </Row>
                </Col>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

    </Row>
    


      {/* <label>Willing to Relocate?
        <input type="checkbox" name="willingToRelocate" style={{height:15, width: 15, marginLeft: 10}} checked={formData.willingToRelocate} onChange={(e) => handleConstantCheckboxChange(e)} />
        </label>  */}
        {/* <div style={{textAlign: 'center'}}>
        <label style={{marginLeft: '80px', marginTop: '20px'}}> Upload your Resume: </label>
        <input style={{marginLeft: 10}} type="file" id="files" name="resume" onChange={handleFileChange} placeholder="upload your resume"/>
        <label for="files">Select file</label>
        <p style={{color: '#ff0000'}}>*Note: Max size of resume .pdf/.doc file is 1 Mb</p> */}

        
        
        
        
        
        {/* Add other constant fields similarly */}
        
        {/* <button type="submit">Submit</button> */}
        
        <div style={{textAlign: 'center'}}>
        <Button className='mx-auto border-0' id="formbutton" onClick={handleSubmit} style={{width: '200px', fontSize: '20px', marginBottom: '50px', marginTop: '20px', backgroundColor: '#02224d'}}>Submit</Button>
        </div>

        </Container>
        

     {/* </form> */}
     {/* </div> */}
    {/* </Card> */}
    {/* </div> */}

{/* ----------------------------------------------------------------------------------------------------- */}

    <Navbar id="navbar1" classname="footernav">
    <Container fluid id="bottomnavcontainer" style={{overflow: 'hidden'}}>
    <Row lg={1} xl={3} >
        <Col>
          <Card className="border-0 mx-auto" id="bottomnav" style={{backgroundColor: '#02224d'}} >
            {/* <Card.Img variant="top" src="img\Talentco-logo-01-removebg-preview.png" /> */}
            <Card.Body>
              {/* <Card.Title style={{color: "#ffffff"}}>Card title</Card.Title> */}
              <a href="https://talentcohr.com/"><img src="img\Picture2.png" style={{width: "200px", marginLeft:"0px", height: "65px"}}/> </a>
              <Card.Text style={{color: "#ffffff", paddingRight: '30px'}}>
              TalentCo’s experts have a strong presence in Manufacturing, Services, Hospitality, FMCG, and Retail sectors. This ensures a high level of motivation, productivity, people engagement, and talent development.
              <br/><br/>
              <a href="https://talentcohr.com/contact-us/"><Button className="rounded-0" variant="light" style={{textTransform: 'capitalize', fontSize: '17px', padding: '18px', paddingBottom: '40px'}}>Contact Us</Button></a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="border-0 mx-auto" id="bottomnav" style={{backgroundColor: '#02224d'}}>
            <Card.Body>
              <Card.Title style={{color: "#ffffff", fontSize: '30px', marginBottom: '30px'}}>Contact Us</Card.Title>
              <Card.Text style={{color: "#ffffff"}}>
               <a href="https://maps.app.goo.gl/YW4RxGDjGfZ99jqZ9" target="_blank" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faLocationDot} />
                508, Ecstasy Business Park,
                City of Joy, J.S.D Road,
                Mulund West, Mumbai - 400080</a>
              <br/><br/>  <a href="tel:+91 77382 49852" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faHeadset} />+91 - 77382 - 49852</a>
              <br/><br/>  <a href="mailto:info@talentcohr.com" target="_blank" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={regularEnvelope} />info@talentcohr.com</a>
              </Card.Text>
              <Row>
              
                <Col xs={2}><a href="https://www.linkedin.com/company/talentco-hr-services-llp/" target="_blank" aria-label="Icon group item"> <img src="https://talentcohr.com/wp-content/uploads/2023/12/linked-2.png"  style={{width: "30px"}}/></a></Col>

                <Col xs={2}><a href="https://www.facebook.com/TalentCo.HR.Services" target="_blank" aria-label="Icon group item"> <img src="https://talentcohr.com/wp-content/uploads/2023/12/fb.png"  style={{width: "30px"}}/></a></Col>

                <Col xs={2}><a href="https://www.youtube.com/channel/UCIFgRBahZc0LF6vylZ8Y1Ig" target="_blank" aria-label="Icon group item"> <img src="https://talentcohr.com/wp-content/uploads/2023/12/youtube-2.png"  style={{width: "30px"}}/></a></Col>

                <Col xs={2}><a href="https://www.instagram.com/talentco.hr.services/" target="_blank" aria-label="Icon group item"> <img src="https://talentcohr.com/wp-content/uploads/2023/12/insta-1.png"  style={{width: "30px"}}/></a></Col>

                <Col xs={2}><a href="https://api.whatsapp.com/send/?phone=919987596852&amp;text&amp;type=phone_number&amp;app_absent=0" target="_blank" aria-label="Icon group item"> <img src="https://talentcohr.com/wp-content/uploads/2023/12/wa.png"  style={{width: "30px"}}/></a></Col>

              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="border-0 mx-auto" id="bottomnav" style={{backgroundColor: '#02224d'}}>
            <Card.Body>
            <Card.Title style={{color: "#ffffff", fontSize: '30px', marginBottom: '30px'}}>Services</Card.Title>
              <Card.Text style={{color: "#ffffff", marginTop: '10px'}}>
              <a href="https://talentcohr.com/hr-consulting-services/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />Consulting & Advisory <br/> Services - HR, IR & ER </a>
              <br/><br/>  
              <a href="https://talentcohr.com/recruitment/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />Talent Acquisition Services </a>
              <br/><br/>  
              <a href="https://talentcohr.com/contract-staffing/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />Contract Staffing Solutions </a>
              <br/><br/>
              <a href="https://talentcohr.com/compliance-liaison/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />Payroll & Compliance Services </a>
              <br/><br/>
              <a href="https://talentcohr.com/training-development/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />Training & Development </a>
              <br/><br/>
              <a href="https://talentcohr.com/women-leadership-coaching-training/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />POSH Consulting & Training </a>
              <br/><br/>
              <a href="https://talentcohr.com/our-services/" style={{textDecoration: 'none', color: '#ffffff'}}><FontAwesomeIcon style={{color: '#ffffff', marginRight: '10px' }} icon={faCaretRight} />View All Services </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    </Row>
    </Container>
    </Navbar>

    <Navbar id="navbar3" style={{height: '100px'}}>
    <Container fluid>  
    <p className="mx-auto" style={{textAlign: 'center', color: '#ffffff', fontSize:'16px', marginTop: '40px'}}>© 2024. <a href="https://talentcohr.com/" style={{textDecoration: 'none', color: '#ffffff'}}><strong>TalentCo HR Services</strong>. </a>All Rights Reserved.</p>
        </Container>  
    </Navbar>
    </>
  );
}

export default FormCSV;
 




{/* ---------------------------------------------------------------------------------------------- */}
        {/* PERSONAL DETAILS */}

        {/* <Container>
        <ListGroup.Item variant="primary" style={{height: '50px'}}>
            <h5 style={{marginTop: '7px', fontSize: '18px'}}>Personal Details</h5>
        </ListGroup.Item>
        </Container> */}
        <br/>
        {/*          
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
                    </Col> 
                    <Col sm={6}>
                    <Row style={{margin: '5px'}}>
                    <Col><label style={{textAlign: 'right'}}>Industry:</label></Col>
                    <Col><select name="industry" value={formData.industry} onChange={handleConstantFieldChange} style={{width: '205px'}}>
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
                  <Col><input type="date" name="dob" value={formData.dob} onChange={handleConstantFieldChange} style={{width: '205px'}}/></Col>
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
                    <Col><select name="gender" value={formData.gender} onChange={handleConstantFieldChange} style={{width: '205px'}}>
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
                  <Col><select name="workPermit" value={formData.workPermit} onChange={handleConstantFieldChange} style={{width: '205px'}}>
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select></Col>
                  </Row>
                  </Col>
                </Row> */}
        