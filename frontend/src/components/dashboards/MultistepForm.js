import React, { useState } from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import '../../css/multistep.css';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Initialize form fields here
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    location:'',
    currentPosition:'',
    relocate:'',
    linkedin:''
    // Add more fields as needed
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



  const isStepValid = () => {
    // Implement validation logic for each step
    switch (step) {
      case 1:
        return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.phone.trim() !== '' && formData.dob.trim() !== '' && formData.location.trim() !== '' && formData.currentPosition.trim() !== '';
      case 2:
        // Add validation for the second step
        return formData.email.trim() !== '' && formData.email.includes('@') && formData.linkedin.includes('linkedin') && links.every((link) => link.link.trim() !== '');
      // Add more cases for additional steps
      case 3:
        // Add validation for experiences
        return experiences.every((exp) => exp.company.trim() !== '' && exp.position.trim() !== '' && exp.duration.trim() !== '' && exp.location.trim() !== '' && exp.description.trim() !== '');
      case 4:
        //Add validation for education
        return education.every((edu) => edu.institute.trim() !== '' && edu.degree.trim() !== '' && edu.field.trim() !== '' && edu.start.trim() !== '' && edu.end.trim !== '' && edu.grade.trim() !== '');
      case 5:
        //Add validation for certification
        return certifications.every((certi) => certi.title.trim() !== '' && certi.issuedBy.trim() !== '' && certi.duration.trim() !== '' && certi.description.trim() !== '');
      case 6:
        //Add validation for skills
        return skills.every((sk) => sk.skill.trim() !== '');
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      setStep((prevStep) => prevStep + 1);
    } else {
      // Display error or prevent moving to the next step
      alert('Please fill in all required fields properly');
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  return (
    <div className="d-flex align-items-center justify-content-center" id="background">
    <Card style={{ width: '60rem', padding: '40px', marginTop: '40px', marginBottom: '40px' }} className="text-center">
      <h2>Resume Form</h2>
      {/* <div style={{ marginBottom: '20px' }}>Step {step}</div> */}

      {/* Progress Dots */}
      {/* <div style={{ marginBottom: '20px' }}>
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            style={{
              marginRight: '10px',
              color: index < step ? '#d71728' : '#101e45',
              fontWeight: index === step - 1 ? 'bold' : 'normal',
            }}
          >
            &#x25CF;
          </span>
        ))}
      </div> */}

      {/* Progress Bar */}
      {/* <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              style={{
                width: '20px',
                height: '5px',
                backgroundColor: index < step ? '#d71728' : '#101e45',
                // marginRight: '10px',
              }}
            ></div>
          ))}
        </div> */}

      {step === 1 && (
        <div>
            <ProgressBar animated variant="danger" now={16.6} style={{marginBottom: "20px"}} />
            <h3>Personal Details</h3>
          <label id="label2">
            First Name:
            <input id="input1" type="text" name="firstName" placeholder="Enter your first name"
            value={formData.firstName} onChange={handleInputChange} />
          </label>
          <label id="label2">
            Last Name:
            <input id="input1" type="text" name="lastName" placeholder="Enter your last name"
            value={formData.lastName} onChange={handleInputChange} />
          </label>
          <label id="label2">
            Phone No.:
            <input id="input1" type="text" name="phone" placeholder="Enter your contact number"
            value={formData.phone} onChange={handleInputChange} />
          </label>
          <label id="label2">
            Date of Birth:
            <input id="input1" type="text" name="dob" placeholder="Enter in dd/mm/yyyy format"
            value={formData.dob} onChange={handleInputChange} />
          </label>
          <label id="label2">
            Location:
            <input id="input1" type="text" name="location" placeholder="Where are you currently located"
            value={formData.location} onChange={handleInputChange} />
          </label>
          <label id="label2">
            Current Position:
            <input id="input1" type="text" name="currentPosition" placeholder="What are you currently working as"
            value={formData.currentPosition} onChange={handleInputChange} />
          </label>
        </div>
      )}

      {step === 2 && (
        <div>
            <ProgressBar animated variant="danger" now={33.2} style={{marginBottom: "20px"}} />
            <h3>Useful Links</h3>
          <label id="label2">
            Email:
            <input id="input1" type="text" name="email" placeholder="Enter your email address"
            value={formData.email} onChange={handleInputChange} />
          </label>
          <label id="label2">
            LinkedIn:
            <input id="input1" type="text" name="linkedin" placeholder="Enter the link to your LinkedIn account"
            value={formData.linkedin} onChange={handleInputChange} />
          </label>
          {/* Add more links */}
          {links.map((link, index) => (
              <div key={index}>
                <label id="label2">
                  Link {index + 1}:
                  <input
                  id="input1"
                    type="text"
                    value={link.link}
                    onChange={(e) => handleLinksChange(index, 'link', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => removeLinks(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addLinks}>
              Add More Links
            </button>
        </div>
      )}

        {step === 3 && (
          <div>
            <ProgressBar animated variant="danger" now={50} style={{marginBottom: "20px"}} />
            <h3>Experiences</h3>
            {experiences.map((exp, index) => (
              <div key={index}>
                <label id="label2">
                  Company:
                  <input
                  id="input1"
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Position:
                  <input
                  id="input1"
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Duration:
                  <input
                  id="input1"
                    type="text"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Location:
                  <input
                  id="input1"
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Description:
                  <input
                  id="input1"
                    type="text"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => removeExperience(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addExperience}>
              Add Experience
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <ProgressBar animated variant="danger" now={66.4} style={{marginBottom: "20px"}} />
            <h3>Education</h3>
            {education.map((edu, index) => (
              <div key={index}>
                <label id="label2">
                  Institute:
                  <input
                  id="input1"
                    type="text"
                    value={edu.institute}
                    onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Degree:
                  <input
                  id="input1"
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Field:
                  <input
                  id="input1"
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Start Date:
                  <input
                  id="input1"
                    type="text"
                    value={edu.start}
                    onChange={(e) => handleEducationChange(index, 'start', e.target.value)}
                  />
                </label>
                <label id="label2">
                  End Date:
                  <input
                  id="input1"
                    type="text"
                    value={edu.end}
                    onChange={(e) => handleEducationChange(index, 'end', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Grade:
                  <input
                  id="input1"
                    type="text"
                    value={edu.grade}
                    onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => removeEducation(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addEducation}>
              Add Education
            </button>
          </div>
        )}

        {step === 5 && (
          <div>
            <ProgressBar animated variant="danger" now={83} style={{marginBottom: "20px"}} />
            <h3>Certifications</h3>
            {certifications.map((certi, index) => (
              <div key={index}>
                <label id="label2">
                  Title:
                  <input
                  id="input1"
                    type="text"
                    value={certi.title}
                    onChange={(e) => handleCertificationsChange(index, 'title', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Issued By:
                  <input
                  id="input1"
                    type="text"
                    value={certi.issuedBy}
                    onChange={(e) => handleCertificationsChange(index, 'issuedBy', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Duration:
                  <input
                  id="input1"
                    type="text"
                    value={certi.duration}
                    onChange={(e) => handleCertificationsChange(index, 'duration', e.target.value)}
                  />
                </label>
                <label id="label2">
                  Description:
                  <input
                  id="input1"
                    type="text"
                    value={certi.description}
                    onChange={(e) => handleCertificationsChange(index, 'description', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => removeCertifications(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addCertifications}>
              Add Certification
            </button>
          </div>
        )}

        {step === 6 && (
          <div>
            <ProgressBar animated variant="danger" now={100} style={{marginBottom: "20px"}} />
            <h3>Skills</h3>
            {skills.map((sk, index) => (
              <div key={index}>
                <label id="label2">
                  Enter Skill:
                  <input
                  id="input1"
                    type="text"
                    value={sk.skill}
                    onChange={(e) => handleSkillsChange(index, 'skill', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => removeSkills(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addSkills}>
              Add Skill
            </button>
            <button type="submit" style={{fontSize: 15, marginLeft: "220px", marginRight: "250px", marginTop: "20px"}} className="rounded edit px-2" class="btn btn-danger">
              Submit
          </button>
          </div>
        )}

      {/* Add more steps as needed */}

      <div style={{ marginTop: '20px' }}>
        <Button onClick={handlePrevStep} disabled={step === 1} variant="dark" size="lg">
          Previous
        </Button>
        <Button onClick={handleNextStep} style={{ marginLeft: '20px' }} variant="danger" size="lg" disabled={step === 6}>
          Next
        </Button>
      </div>
      
      </Card>
    </div>
  );
};

export default MultiStepForm;
