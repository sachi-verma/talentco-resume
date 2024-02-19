import React, { useState } from 'react';
import { Card, Button, ListGroup, Badge, Modal, Row, Col, Form } from 'react-bootstrap';
import '../../css/multistep.css';
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';
import Months from '../formats/months';
import Years from '../formats/years';
import Experience from '../resume-components/experience';
import Education from '../resume-components/education';
import Skills from '../resume-components/skills';
import Certification from '../resume-components/certifications';
import Personal from '../resume-components/personal';




const SinglePageForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    location:'',
    currentPosition:'',
    relocate:'',
    linkedin:'',
  });
  const [experiences, setExperiences] = useState([{ company: '', position: '', duration: '', location:'', description:'' }]);
  const [education, setEducation] = useState([{ institute:'', degree:'', field:'', start:'', end:'', grade:''}]);
  const [links, setLinks] = useState([{ link: ''}]);
  const [certifications, setCertifications] = useState([{title:'', issuedBy:'', duration:'', description:''}]);
  const [skills, setSkills] = useState([{ skill: ''}]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //-------------------EXPERIENCES----------------------------
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences((prevExperiences) => [...prevExperiences, { company: '', position: '', duration: '', location:'', description:'' }]);
  };

  const removeExperience = (index) => {
    setExperiences((prevExperiences) => [
      ...prevExperiences.slice(0, index),
      ...prevExperiences.slice(index + 1),
    ]);
  };

  //--------------------------EDUCATION-------------------------------------
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation((prevEducation) => [...prevEducation, { institute:'', degree:'', field:'', start:'', end:'', grade:'' }]);
  };

  const removeEducation = (index) => {
    setEducation((prevEducation) => [
      ...prevEducation.slice(0, index),
      ...prevEducation.slice(index + 1),
    ]);
  };

  //------------------------------CERTIFICATIONS-----------------------------
  const handleCertificationsChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const addCertifications = () => {
    setCertifications((prevCertifications) => [...prevCertifications, { title:'', issuedBy:'', duration:'', description:'' }]);
  };

  const removeCertifications = (index) => {
    setCertifications((prevCertifications) => [
      ...prevCertifications.slice(0, index),
      ...prevCertifications.slice(index + 1),
    ]);
  };

  //------------------------------LINKS-----------------------------
  const handleLinksChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const addLinks = () => {
    setLinks((prevLinks) => [...prevLinks, { link: '' }]);
  };

  const removeLinks = (index) => {
    setLinks((prevLinks) => [
      ...prevLinks.slice(0, index),
      ...prevLinks.slice(index + 1),
    ]);
  };

   //------------------------------SKILLS-----------------------------
   const handleSkillsChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const addSkills = () => {
    setSkills((prevSkills) => [...prevSkills, { skill: '' }]);
  };

  const removeSkills = (index) => {
    setSkills((prevSkills) => [
      ...prevSkills.slice(0, index),
      ...prevSkills.slice(index + 1),
    ]);
  };


  const isFormValid = () => {
    return (
        formData.firstName.trim() !== '' && 
        formData.lastName.trim() !== '' && 
        formData.phone.trim() !== '' && 
        formData.dob.trim() !== '' && 
        formData.location.trim() !== '' && 
        formData.currentPosition.trim() !== '' &&
        formData.email.trim() !== '' && 
        formData.email.includes('@') && 
        formData.linkedin.includes('linkedin') &&
        links.every((link) => link.link.trim() !== '') &&
        experiences.every((exp) => exp.company.trim() !== '' && 
                            exp.position.trim() !== '' && 
                            exp.duration.trim() !== '' && 
                            exp.location.trim() !== '' && 
                            exp.description.trim() !== '') &&
        education.every((edu) => edu.institute.trim() !== '' && 
                            edu.degree.trim() !== '' && 
                            edu.field.trim() !== '' && 
                            edu.start.trim() !== '' && 
                            edu.end.trim !== '' && 
                            edu.grade.trim() !== '') &&
        certifications.every((certi) => certi.title.trim() !== '' && 
                            certi.issuedBy.trim() !== '' && 
                            certi.duration.trim() !== '' && 
                            certi.description.trim() !== '') &&
        skills.every((sk) => sk.skill.trim() !== '')
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // Perform submission logic here
      console.log('Form submitted:', { formData, experiences });
    } else {
      alert('Please fill in all required fields properly');
    }
  };

  //------------MODAL------------
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  return (
    <div className="d-flex align-items-center justify-content-center" id="background">
      <Card style={{ width: '70rem',  marginTop: '40px', marginBottom: '40px', paddingTop: "50px", paddingBottom: "50px" }} className="text-start" >
      {/* <Card.Header>Resume Form</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
            Personal Details
            
            <Badge bg="danger" className="justify-content-end" pill style={{ marginLeft: "50px" }}>
            <Button style={{height: "10px", background: "none", border: "none", outline: "none", focus: "none", boxShadow: "none"}} onClick={handleShow} active="false">
                Edit
            </Button>
            </Badge>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                I will not close if you click outside me. Do not even try to press
                escape key.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            

        </ListGroup.Item>
      </ListGroup> */}
        {/* <Card.Title className="text-center" style={{fontSize: 30, marginBottom: "10px"}}>Personal Details</Card.Title>
      
            <div className="d-flex align-items-center justify-content-center">
            
            <label id="label1">
                First Name:
                <input id="input1" type="text" name="firstName" placeholder="Enter your first name"
                value={formData.firstName} onChange={handleInputChange} />
            </label>
            <label id="label1">
                Last Name:
                <input id="input1" type="text" name="lastName" placeholder="Enter your last name"
                value={formData.lastName} onChange={handleInputChange} />
            </label>
            </div>

            <div className="d-flex align-items-center justify-content-center">
            <label id="label1">
                Phone No.:
                <input id="input1" type="text" name="phone" placeholder="Enter your contact number"
                value={formData.phone} onChange={handleInputChange} />
            </label>
            <label id="label1">
                Date of Birth:
                <input id="input1" type="text" name="dob" placeholder="Enter in dd/mm/yyyy format"
                value={formData.dob} onChange={handleInputChange} />
            </label>
            </div>

            <div className="d-flex align-items-center justify-content-center">
            <label id="label1">
                Location:
                <input id="input1" type="text" name="location" placeholder="Where are you currently located"
                value={formData.location} onChange={handleInputChange} />
            </label>
            <label id="label1">
                Current Position:
                <input id="input1" type="text" name="currentPosition" placeholder="What are you currently working as"
                value={formData.currentPosition} onChange={handleInputChange} />
            </label>
            </div>
            
            <div className="d-flex align-items-center justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I am willing to relocate" name="isWorking" />
            </Form.Group>
            </div> */}
       

      <Personal></Personal>
      <Experience></Experience>
      <Education></Education>
      <Certification></Certification>
      <Skills></Skills>
      

      <button type="submit" style={{fontSize: 15, marginLeft: "250px", marginRight: "250px", marginTop: "20px"}} className="rounded edit px-2" class="btn btn-danger">
              Submit
        </button>








        {/* <h2>Resume Form</h2>
        
        <div>
            <h3>Personal Details</h3>
          <label id="label1">
            First Name:
            <input id="input1" type="text" name="firstName" placeholder="Enter your first name"
            value={formData.firstName} onChange={handleInputChange} />
          </label>
          <label id="label1">
            Last Name:
            <input id="input1" type="text" name="lastName" placeholder="Enter your last name"
            value={formData.lastName} onChange={handleInputChange} />
          </label>
          <label id="label1">
            Phone No.:
            <input id="input1" type="text" name="phone" placeholder="Enter your contact number"
            value={formData.phone} onChange={handleInputChange} />
          </label>
          <label id="label1">
            Date of Birth:
            <input id="input1" type="text" name="dob" placeholder="Enter in dd/mm/yyyy format"
            value={formData.dob} onChange={handleInputChange} />
          </label>
          <label id="label1">
            Location:
            <input id="input1" type="text" name="location" placeholder="Where are you currently located"
            value={formData.location} onChange={handleInputChange} />
          </label>
          <label id="label1">
            Current Position:
            <input id="input1" type="text" name="currentPosition" placeholder="What are you currently working as"
            value={formData.currentPosition} onChange={handleInputChange} />
          </label>
        </div>

        <h3>Experiences</h3>
        {experiences.map((exp, index) => (
          <div key={index}>
            <label>
              Company:
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              />
            </label>
            <label>
              Position:
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              />
            </label>
            <label>
              Duration:
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
              />
            </label>
            <button type="button" onClick={() => removeExperience(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addExperience} style={{marginLeft: "150px", marginRight: "150px" }}>
          Add Experience
        </button>

        <div style={{ marginTop: '20px' }}>
          <Button onClick={handleSubmit} 
        //   disabled={!isFormValid()}
        variant="danger" size="lg">
            Submit
          </Button>
        </div>*/}
      </Card>
    </div> 
  );
};

export default SinglePageForm;
