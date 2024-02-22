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


  
function DynamicForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    dob: '',
    gender: '',
    address: '',
    currentLocation: '',
    currentDesignation: '',
    currentCTC: '',
    industry:'',
    experience:'',
    willingToRelocate: false,
    resume: null,
    // skills: ['']
  });

const [educationModalShow, setEducationModalShow] = useState(false);
const [educationModalFormData, setEducationModalFormData] = useState([]);
const [editEducationIndex, setEducationEditIndex] = useState(null);
const [editEducationData, setEditEducationData] = useState(null);

  const mappedData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    linkedin: formData.linkedin,
    dob: formData.dob,
    gender: formData.gender,
    address: formData.address,
    current_location: formData.currentLocation,
    current_designation: formData.currentDesignation,
    current_ctc: formData.currentCTC,
    industry: formData.industry,
    experience: formData.experience,
    willing_to_relocate: formData.willingToRelocate,
    resume_path: formData.resume,
    education: educationModalFormData,
    // skills: formData.skills
  };

  const handleConstantFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (index, e) => {
    const { name, checked } = e.target;
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: checked,
      endDate: checked ? '' : updatedExperience[index].endDate // Clear end date if checked
    };
  setFormData({ ...formData, experience: updatedExperience });
  };

  const handleConstantCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleCertificationsInputChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...formData.certifications];
    list[index][name] = value;
    setFormData({ ...formData, certifications: list });
  };

  const handleAddCertifications = () => {
    setFormData({ ...formData, certifications: [...formData.certifications, { title: '', field: '', issuer: '', startDate: '', endDate: '', description: '' }] })
  };

  const handleAddSkills = () => {
    setFormData({ ...formData, skills: [...formData.skills, '']})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic
    // console.log(formData);
    try {
        await axios.post('http://localhost:3002/submit-form', mappedData);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again later.');
      }
  };

  const handleDeleteCertifications = (index) => {
    const updatedCertifications = [...formData.certifications ];
    updatedCertifications .splice(index, 1);
    setFormData({ ...formData, certifications : updatedCertifications   });
  };

  const handleDeleteSkills = (index) => {
    const updatedSkills = [...formData.skills ];
    updatedSkills .splice(index, 1);
    setFormData({ ...formData, skills : updatedSkills   });
  };

// --------------------------------------------------------------------------------------
// EDUCATION MODAL FUNCTION
const handleEducationAdd = () => {
    setEducationEditIndex(null);
    setEditEducationData(null);
    setEducationModalShow(true);
  };

const handleEducationModalSubmit = (formData) => {
    if (editEducationIndex !== null) {
        const newEducationFormData = [...educationModalFormData];
        newEducationFormData[editEducationIndex] = formData;
        setEducationModalFormData(newEducationFormData);
        setEducationEditIndex(null);
        setEditEducationData(null);
      } else {
        setEducationModalFormData([...educationModalFormData, formData]);
      }
      setEducationModalShow(false);
};

const handleEducationEdit = (index) => {
    setEducationEditIndex(index);
    setEditEducationData(educationModalFormData[index]);
    setEducationModalShow(true);
  };

const handleEducationRemove = (index) => {
    const newEducationFormData = [...educationModalFormData];
    newEducationFormData.splice(index, 1);
    setEducationModalFormData(newEducationFormData);
  };

// --------------------------------------------------------------------------------------
// EXPERIENCE MODAL FUNCTION
const [experienceModalShow, setExperienceModalShow] = useState(false);
const [experienceModalFormData, setExperienceModalFormData] = useState([]);
const [editExperienceIndex, setExperienceEditIndex] = useState(null);
const [editExperienceData, setEditExperienceData] = useState(null);
  
const handleExperienceAdd = () => {
      setExperienceEditIndex(null);
      setEditExperienceData(null);
      setExperienceModalShow(true);
    };
  
const handleExperienceModalSubmit = (formData) => {
      if (editExperienceIndex !== null) {
          const newExperienceFormData = [...experienceModalFormData];
          newExperienceFormData[editExperienceIndex] = formData;
          setExperienceModalFormData(newExperienceFormData);
          setExperienceEditIndex(null);
          setEditExperienceData(null);
        } else {
          setExperienceModalFormData([...experienceModalFormData, formData]);
        }
        setExperienceModalShow(false);
  };
  
const handleExperienceEdit = (index) => {
      setExperienceEditIndex(index);
      setEditExperienceData(experienceModalFormData[index]);
      setExperienceModalShow(true);
    };
  
const handleExperienceRemove = (index) => {
      const newExperienceFormData = [...experienceModalFormData];
      newExperienceFormData.splice(index, 1);
      setExperienceModalFormData(newExperienceFormData);
    };

// --------------------------------------------------------------------------------------
// CERTIFICATIONS MODAL FUNCTION
const [certificationsModalShow, setCertificationsModalShow] = useState(false);
const [certificationsModalFormData, setCertificationsModalFormData] = useState([]);
const [editCertificationsIndex, setCertificationsEditIndex] = useState(null);
const [editCertificationsData, setEditCertificationsData] = useState(null);
  
const handleCertificationsAdd = () => {
      setCertificationsEditIndex(null);
      setEditCertificationsData(null);
      setCertificationsModalShow(true);
    };
  
const handleCertificationsModalSubmit = (formData) => {
      if (editCertificationsIndex !== null) {
          const newCertificationsFormData = [...certificationsModalFormData];
          newCertificationsFormData[editCertificationsIndex] = formData;
          setCertificationsModalFormData(newCertificationsFormData);
          setCertificationsEditIndex(null);
          setEditCertificationsData(null);
        } else {
          setCertificationsModalFormData([...certificationsModalFormData, formData]);
        }
        setCertificationsModalShow(false);
  };
  
const handleCertificationsEdit = (index) => {
      setCertificationsEditIndex(index);
      setEditCertificationsData(certificationsModalFormData[index]);
      setCertificationsModalShow(true);
    };
  
const handleCertificationsRemove = (index) => {
      const newCertificationsFormData = [...certificationsModalFormData];
      newCertificationsFormData.splice(index, 1);
      setCertificationsModalFormData(newCertificationsFormData);
    };

// --------------------------------------------------------------------------------------
// SKILLS MODAL FUNCTION
const [skillsModalShow, setSkillsModalShow] = useState(false);
const [skillsModalFormData, setSkillsModalFormData] = useState([]);
const [editSkillsIndex, setSkillsEditIndex] = useState(null);
const [editSkillsData, setEditSkillsData] = useState(null);
  
const handleSkillsAdd = () => {
      setSkillsEditIndex(null);
      setEditSkillsData(null);
      setSkillsModalShow(true);
    };
  
const handleSkillsModalSubmit = (newSkills) => {
    //   if (editSkillsIndex !== null) {
    //       const newSkillsFormData = [...skillsModalFormData];
    //       newSkillsFormData[editSkillsIndex] = formData;
    //       setSkillsModalFormData(newSkillsFormData);
    //       setSkillsEditIndex(null);
    //       setEditSkillsData(null);
    //     } else {
    //       setSkillsModalFormData([...skillsModalFormData, formData]);
    //     }
    //     setSkillsModalShow(false);

    setSkillsModalFormData(newSkills);
    setSkillsModalShow(false);
  };
  
const handleSkillsEdit = (index) => {
      setSkillsEditIndex(index);
      setEditSkillsData(skillsModalFormData[index]);
      setSkillsModalShow(true);
    };
  
const handleSkillsRemove = (index) => {
      const newSkillsFormData = [...skillsModalFormData];
      newSkillsFormData.splice(index, 1);
      setSkillsModalFormData(newSkillsFormData);
    };


  return (
    
    
    <>
    <Helmet>
        <title>Talentco | Resume Form</title>
    </Helmet>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">  
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
              <Nav.Link eventKey="1" href="http://localhost:3000/dynamicform" style={{margin: '5px'}}>Resume Form</Nav.Link>  
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
        <Container>
        <ListGroup.Item variant="primary" style={{height: '50px'}}>
            <h5 style={{marginTop: '7px', fontSize: '18px'}}>Personal Details</h5>
        </ListGroup.Item>
        </Container>
         <br/>
         
        <Row style={{marginRight: '30px'}}>
            <Col sm={6}>
            <Row>
            <Col><label style={{textAlign: 'right'}}> Name: </label></Col>
            <Col><input type="text" name="name" value={formData.name} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
            <Col sm={6}>
            <Row>
            <Col><label style={{textAlign: 'right'}}> Email: </label ></Col>
            <Col><input type="text" name="email" value={formData.email} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
            <Col sm={6}>
            <Row>
            <Col><label style={{textAlign: 'right'}}> Mobile No.:</label></Col>
            <Col><input type="text" name="phone" value={formData.phone} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
            <Col sm={6}>
            <Row>   
            <Col><label style={{textAlign: 'right'}}>Linkedin:</label></Col>
            <Col><input type="text" name="linkedin" value={formData.linkedin} onChange={handleConstantFieldChange} /></Col>
            </Row>
            </Col>
          </Row>

        <Row style={{marginRight: '30px'}}>
          <Col sm={6}>
          <Row>
          <Col><label style={{textAlign: 'right'}}> Date of birth:</label></Col>
          <Col><input type="date" name="dob" value={formData.dob} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row>
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
        <Row>
        <Col><label style={{textAlign: 'right'}}>Industry:</label></Col>
          <Col><input type="text" name="industry" value={formData.industry} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row>
            <Col><label style={{textAlign: 'right'}}>Experience (yrs):</label></Col>
          <Col><input type="text" name="experience" value={formData.experience} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row>
        <Col><label style={{textAlign: 'right'}}>Address:</label></Col>
          <Col><input type="text" name="address" value={formData.address} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row>
           <Col> <label style={{textAlign: 'right'}}>Current Location:</label></Col>
          <Col><input type="text" name="currentLocation" value={formData.currentLocation} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <Row style={{marginRight: '30px'}}>
        <Col sm={6}>
        <Row>
        <Col><label style={{textAlign: 'right'}}>Current Designation:</label></Col>
          <Col><input type="text" name="currentDesignation" value={formData.currentDesignation} onChange={handleConstantFieldChange} /></Col>
          </Row>
          </Col>
          <Col sm={6}>
            <Row>
            <Col><label style={{textAlign: 'right'}}>Current CTC:</label></Col>
          <Col><input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleConstantFieldChange} /></Col>
          </Row>
        </Col>
        </Row>

        <label>Willing to Relocate?
        <input type="checkbox" name="willingToRelocate" style={{height:15, width: 15, marginLeft: 10}} checked={formData.willingToRelocate} onChange={(e) => handleConstantCheckboxChange(e)} />
        </label> 
        
        <label style={{marginLeft: 80}}> Upload your Resume: 
        <input style={{marginLeft: 10}} type="file" name="resume" onChange={handleFileChange} />
        </label>
        
        
        {/* Add other constant fields similarly */}
        

{/* ------------------------------------------------------------------------------------------------- */}
        {/* EDUCATION MODAL */}
        {/* Add a button to open the modal */}
        <Container>
        <ListGroup.Item variant="primary" style={{height: '50px'}}> 
        <Row>
        <Col xs={10}><h5 style={{marginTop: '7px', fontSize: '18px'}}>Add Education Entries</h5></Col>
        <Col xs={2}><MdAddCircleOutline size={30} className="rounded edit" style={{marginTop: '3px'}} onClick={handleEducationAdd} /></Col>
        </Row>
        </ListGroup.Item>
        </Container>
        {/* <Button onClick={handleEducationAdd}>Add Education Entries</Button> */}

        {/* Modal for additional entries */}
        <Modal show={educationModalShow} onHide={() => setEducationModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editEducationIndex !== null ? 'Edit Entry' : 'Add Entry'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EducationModalForm onSubmit={handleEducationModalSubmit} editData={editEducationData} />
          </Modal.Body>
        </Modal>

        {/* Display modal form data in the parent form */}
        {educationModalFormData.map((entry, index) => (
          <div key={index}>
            {entry.institute} <br/> 
            {entry.degree} - {entry.specialization} {/* Display fields as needed */}
            <br/>
            <Button onClick={() => handleEducationEdit(index)}>Edit</Button>
            <span/>
            <Button onClick={() => handleEducationRemove(index)}>Remove</Button>
          </div>
        ))}

        <br/>


 {/* ------------------------------------------------------------------------------------------------- */}
        {/* EXPERIENCE MODAL */}
        {/* Add a button to open the modal */}
        <Container>
        <ListGroup.Item variant="primary" style={{height: '50px'}}>
        <Row> 
        <Col xs={10}><h5 style={{marginTop: '7px', fontSize: '18px'}}>Add Experience Entries</h5></Col>
        <Col xs={2}><MdAddCircleOutline size={30} className="rounded edit" style={{marginTop: '3px'}} onClick={handleExperienceAdd} /></Col>
        </Row>
        </ListGroup.Item>
        </Container>
        {/* <Button onClick={handleExperienceAdd}>Add Experience Entries</Button> */}

        {/* Modal for additional entries */}
        <Modal show={experienceModalShow} onHide={() => setExperienceModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editExperienceIndex !== null ? 'Edit Entry' : 'Add Entry'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExperienceModalForm onSubmit={handleExperienceModalSubmit} editData={editExperienceData} />
          </Modal.Body>
        </Modal>

        {/* Display modal form data in the parent form */}
        {experienceModalFormData.map((entry, index) => (
          <div key={index}>
            {entry.jobTitle} <br/> {entry.company} {/* Display fields as needed */}
            <Button onClick={() => handleExperienceEdit(index)}>Edit</Button>
            <Button onClick={() => handleExperienceRemove(index)}>Remove</Button>
          </div>
        ))}

        <br/>       


{/* ------------------------------------------------------------------------------------------------- */}
        {/* CERTIFICATIONS MODAL */}
        {/* Add a button to open the modal */}
        <Container>
        <ListGroup.Item variant='primary' style={{height: '50px'}}>
        <Row> 
        <Col xs={10}><h5 style={{marginTop: '7px', fontSize: '18px'}}>Add Certifications Entries</h5></Col>
        <Col xs={2}><MdAddCircleOutline size={30} className="rounded edit" style={{marginTop: '3px'}} onClick={handleCertificationsAdd} /></Col>
        </Row>
        </ListGroup.Item>
        </Container>
        {/* <Button onClick={handleCertificationsAdd}>Add Certifications Entries</Button> */}

        {/* Modal for additional entries */}
        <Modal show={certificationsModalShow} onHide={() => setCertificationsModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editCertificationsIndex !== null ? 'Edit Entry' : 'Add Entry'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CertificationsModalForm onSubmit={handleCertificationsModalSubmit} editData={editCertificationsData} />
          </Modal.Body>
        </Modal>

        {/* Display modal form data in the parent form */}
        {certificationsModalFormData.map((entry, index) => (
          <div key={index}>
            {entry.jobTitle} <br/> {entry.company} {/* Display fields as needed */}
            <Button onClick={() => handleCertificationsEdit(index)}>Edit</Button>
            <Button onClick={() => handleCertificationsRemove(index)}>Remove</Button>
          </div>
        ))}

        <br/>       



{/* ------------------------------------------------------------------------------------------------- */}
        {/* SKILLS MODAL */}  
        <Container>    
        <ListGroup.Item variant='primary' style={{height: '50px'}}>
        <Row> 
        <Col xs={10}><h5 style={{marginTop: '7px', fontSize: '18px'}}>Add Skills Entries</h5></Col>
        <Col xs={2}><MdAddCircleOutline size={30} className="rounded edit" style={{marginTop: '3px'}} onClick={() => setSkillsModalShow(true)} /></Col>
        </Row>
        </ListGroup.Item>
        </Container>
        {/* <Button onClick={() => setSkillsModalShow(true)}>Add Skills</Button> */}

        <SkillsModal show={skillsModalShow} 
        handleClose={() => setSkillsModalShow(false)} 
        onSubmit={handleSkillsModalSubmit} />

    <div style={{ marginTop: '10px', maxWidth: '80rem'}}>
        <div>
        {skillsModalFormData.map((skill, index) => (
            
            <Badge key={index} pill bg="secondary" text="dark" style={{ margin: '5px', padding: '5px'}}>
            {skill}
            </Badge>
            
        ))}
        </div>
        {skillsModalFormData.length > 0 && (
          <Button variant="primary" onClick={() => setSkillsModalShow(true)}>
            Edit
          </Button>
        )}
        </div>
    
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

export default DynamicForm;
