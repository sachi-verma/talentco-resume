import React, { useState } from 'react';
import '../../css/multistep.css';
import { Form, Card, Button, ProgressBar, ListGroup, Modal } from 'react-bootstrap';
import EducationModalForm from '../modal-forms/EducationModal'
import ExperienceModalForm from '../modal-forms/ExperienceModal'

  
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
    willingToRelocate: false,
    resume: null,
    // education: [{ institute: '', degree: '', specialization: '', startDate: '', endDate: '', grade: '', description: '' }],
    // experience: [{ jobTitle: '', company: '', startDate: '', endDate: '', currentlyWorking: false, location: '', description: '' }],
    certifications: [{ title: '', field: '', issuer: '', startDate: '', endDate: '', description: '' }],
    skills: ['']
  });

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

//   const handleEducationInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const list = [...formData.education];
//     list[index][name] = value;
//     setFormData({ ...formData, education: list });
//   };

//   const handleExperienceInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const list = [...formData.experience];
//     list[index][name] = value;
//     setFormData({ ...formData, experience: list });
//   };

  const handleCertificationsInputChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...formData.certifications];
    list[index][name] = value;
    setFormData({ ...formData, certifications: list });
  };

//   const handleAddEducation = () => {
//     setFormData({ ...formData, education: [...formData.education, { institute: '', degree: '', specialization: '', startDate: '', endDate: '', grade: '', description: '' }] });
//   };

  // Similar functions for experience, certifications, and skills
//   const handleAddExperience = () => {
//     setFormData({ ...formData, experience: [...formData.experience, { jobTitle: '', company: '', startDate: '', endDate: '', currentlyWorking: false, location: '', description: '' }] })
//   };

  const handleAddCertifications = () => {
    setFormData({ ...formData, certifications: [...formData.certifications, { title: '', field: '', issuer: '', startDate: '', endDate: '', description: '' }] })
  };

  const handleAddSkills = () => {
    setFormData({ ...formData, skills: [...formData.skills, '']})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic
    console.log(formData);
  };

//   const handleDeleteEducation = (index) => {
//     const updatedEducation = [...formData.education];
//     updatedEducation.splice(index, 1);
//     setFormData({ ...formData, education: updatedEducation });
//   };

//   const handleDeleteExperience = (index) => {
//     const updatedExperience = [...formData.experience];
//     updatedExperience.splice(index, 1);
//     setFormData({ ...formData, experience: updatedExperience });
//   };

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

//   const [showEducationModal, setShowEducationModal] = useState(false);

//   const handleShowEducationModal = () => {
//     setShowEducationModal(true);
//   };

//   const handleHideEducationModal = () => {
//     setShowEducationModal(false);
//   };

// --------------------------------------------------------------------------------------
// MODAL FUNCTIONS
const [educationModalShow, setEducationModalShow] = useState(false);
const [educationModalFormData, setEducationModalFormData] = useState([]);
const [editEducationIndex, setEducationEditIndex] = useState(null);
const [editEducationData, setEditEducationData] = useState(null);

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




  return (
    
    <div className="d-flex align-items-center justify-content-center" id="background">
    <Card style={{ width: '80rem', padding: '10px', marginTop: '40px', marginBottom: '40px' }} className="text-center">
      <h1 style={{align: 'center'}}>Resume Form</h1>
      <div className='justify-content-start'>
      <form onSubmit={handleSubmit}>
      <ListGroup>
        {/* Constant Fields */}
        <ListGroup.Item>Personal Details</ListGroup.Item> <br/>
        <label>
          Name:
          <input type="text" name="name" style={{marginLeft: 10}} value={formData.name} onChange={handleConstantFieldChange} />
          <span/>
          Email:
          <input type="text" name="email" style={{marginLeft: 10}} value={formData.email} onChange={handleConstantFieldChange} />
        </label >
        {/* <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleConstantFieldChange} />
        </label> */}
        <label>
          Mobile No.:
          <input type="text" name="phone" style={{marginLeft: 10}} value={formData.phone} onChange={handleConstantFieldChange} />
          <span/>
          Linkedin:
          <input type="text" name="linkedin" style={{marginLeft: 10}} value={formData.linkedin} onChange={handleConstantFieldChange} />
          </label>
          <label>
          Date of birth:
          <input type="date" name="dob" style={{marginLeft: 10}} value={formData.dob} onChange={handleConstantFieldChange} />
          <span/>
          Gender:
            <select name="gender" style={{marginLeft: 10}} value={formData.gender} onChange={handleConstantFieldChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </label>
        {/* <label>
          Date of birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleConstantFieldChange} />
        </label>
        <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleConstantFieldChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </label> */}
        <label>
          Address:
          <input type="text" name="address" style={{marginLeft: 10}} value={formData.address} onChange={handleConstantFieldChange} />
          <span/>
          Current Location:
          <input type="text" name="currentLocation" style={{marginLeft: 10}} value={formData.currentLocation} onChange={handleConstantFieldChange} />
        </label>
        {/* <label>
          Current Location:
          <input type="text" name="currentLocation" value={formData.currentLocation} onChange={handleConstantFieldChange} />
        </label> */}
        <label>
          Current Designation:
          <input type="text" name="currentDesignation" style={{marginLeft: 10}} value={formData.currentDesignation} onChange={handleConstantFieldChange} />
          <span/>
          Current CTC:
          <input type="text" name="currentCTC" style={{marginLeft: 10}} value={formData.currentCTC} onChange={handleConstantFieldChange} />
        </label>
        {/* <label>
          Current CTC:
          <input type="text" name="currentCTC" value={formData.currentCTC} onChange={handleConstantFieldChange} />
        </label> */}
        <label>
            Willing to Relocate?
            <input type="checkbox" name="willingToRelocate" style={{marginLeft: 10, height:15, width: 15}} checked={formData.willingToRelocate} onChange={(e) => handleConstantCheckboxChange(e)} />
        </label> 
        <label>
            Upload your Resume
            <input type="file" name="resume" style={{marginLeft: 10}} onChange={handleFileChange} />
        </label>
        {/* Add other constant fields similarly */}

{/* ------------------------------------------------------------------------------------------------- */}
        {/* EDUCATION MODAL */}
        {/* Add a button to open the modal */}
        <Button onClick={handleEducationAdd}>Add Education Entries</Button>

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

        {/* Dynamic Fields - Set 1: Education */}
        {/* <fieldset>
          <ListGroup.Item>Education <button type="button" onClick={handleShowEducationModal}>Add Education</button>
        </ListGroup.Item> <br/>
          <Modal show={showEducationModal} onHide={handleHideEducationModal} backdrop="static" keyboard={false}>
          {formData.education.map((education, index) => (
            <div key={index}>
                <Modal.Header closeButton>
          <Modal.Title>Add Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <label>
                Institute:
                <input type="text" name="institute" value={education.institute} onChange={(e) => handleEducationInputChange(index, e)} />
              </label>
              <label>
                
                Degree:
                <input type="text" name="degree" value={education.degree} onChange={(e) => handleEducationInputChange(index, e)} />
              </label>
              <label>
                Specialization:
                <input type="text" name="specialization" value={education.specialization} onChange={(e) => handleEducationInputChange(index, e)} />
                
                </label>
              <label>
                Grade:
                <input type="text" name="grade" value={education.grade} onChange={(e) => handleEducationInputChange(index, e)} />
              </label>
              <label>
                Start Date:
                <input type="date" name="startDate" value={education.startDate} onChange={(e) => handleEducationInputChange(index, e)} />
              </label>
              <label>  
                End Date:
                <input type="date" name="endDate" value={education.endDate} onChange={(e) => handleEducationInputChange(index, e)} />
              </label>
              {/* <label>
                Grade:
                <input type="text" name="grade" value={education.grade} onChange={(e) => handleEducationInputChange(index, e)} />
              </label> -----------              
              <label>
                Description:
                <input type="text" name="description" value={education.description} onChange={(e) => handleEducationInputChange(index, e)} />
              </label>
              </Modal.Body>
              {/* Add other education fields similarly -----------
              <button type="button" onClick={() => handleDeleteEducation(index)}>Delete</button>
            </div>
          ))}
          </Modal>
          
        </fieldset> */}


 {/* ------------------------------------------------------------------------------------------------- */}
        {/* EXPERIENCE MODAL */}
        {/* Add a button to open the modal */}
        <Button onClick={handleExperienceAdd}>Add Experience Entries</Button>

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

        {/* Dynamic Fields - Set 2: Experience */}
        {/* Similar implementation as Education ---comment
        <fieldset>
        <ListGroup.Item>Experience</ListGroup.Item> <br/>
          {formData.experience.map((experience, index) => (
            <div key={index}>
             <label>
                Job Title:
                <input type="text" name="jobTitle" style={{marginLeft: 10}} value={experience.jobTitle} onChange={(e) => handleExperienceInputChange(index, e)} />
                <span/>
                Company:
                <input type="text" name="company" style={{marginLeft: 10}} value={experience.company} onChange={(e) => handleExperienceInputChange(index, e)} />
              </label>
              {/* <label> ---comment
                Company:
                <input type="text" name="company" value={experience.company} onChange={(e) => handleExperienceInputChange(index, e)} />
              </label> 
              <label>
                Start Date:
                <input type="date" name="startDate" style={{marginLeft: 10}} value={experience.startDate} onChange={(e) => handleExperienceInputChange(index, e)} />
              {/* </label> ---comment
              {/* <label>
                End Date:
                <input type="date" name="endDate" value={experience.endDate} onChange={(e) => handleExperienceInputChange(index, e) } />
              </label>
              <label>
                Currently Working?
                <input type="checkbox" name="currentlyWorking" checked={experience.currentlyWorking} onChange={(e) => handleCheckboxChange(index, e)} />
              </label> */} 
              {/* <label> --comment
              <span/>
                Currently Working 
              <input type="checkbox" name="currentlyWorking" style={{marginLeft: 10, height:15, width: 15}} checked={experience.currentlyWorking} onChange={(e) => handleCheckboxChange(index, e)} />
              {/* </label> ---comment
                {!experience.currentlyWorking && (
                    <>
                    <span/>
                <label>End Date:
                <input type="date" name={`experience[${index}].endDate`} style={{marginLeft: 10}} value={experience.endDate} onChange={(e) => handleExperienceInputChange('experience', index, e)} /> 
                </label>
                </>
                )}
              </label>
              <label>
                Location:
                <input type="text" name="location" style={{marginLeft: 10}} value={experience.location} onChange={(e) => handleExperienceInputChange(index, e)} />
              {/* </label>
              <label> ---comment
              <span/>
                Description:
                <input type="text" name="description" style={{marginLeft: 10}} value={experience.description} onChange={(e) => handleExperienceInputChange(index, e)} />
              </label>
              {/* Add other experience fields similarly ---comment
              <button type="button" onClick={() => handleDeleteExperience(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={handleAddExperience}>Add More Experience</button>
        </fieldset> */}

        {/* Dynamic Fields - Set 3: Certifications */}
        {/* Similar implementation as Education */}
        <fieldset>
        <ListGroup.Item>Certifications</ListGroup.Item> <br/>
          {formData.certifications.map((certifications, index) => (
            <div key={index}>
              <label>
                Title:
                <input type="text" name="jobTitle" value={certifications.title} onChange={(e) => handleCertificationsInputChange(index, e)} />
              {/* </label>
              <label> */}
                <span/>
                Field:
                <input type="text" name="company" value={certifications.field} onChange={(e) => handleCertificationsInputChange(index, e)} />
              </label>
              {/* <label>
                Issuer:
                <input type="text" name="company" value={certifications.issuer} onChange={(e) => handleCertificationsInputChange(index, e)} />
              </label> */}
              <label>
                Start Date:
                <input type="date" name="startDate" value={certifications.startDate} onChange={(e) => handleCertificationsInputChange(index, e)} />
              {/* </label>
              <label> */}
                <span/>
                End Date:
                <input type="date" name="endDate" value={certifications.endDate} onChange={(e) => handleCertificationsInputChange(index, e)} />
              </label>             
              <label>
                Issuer:
                <input type="text" name="company" value={certifications.issuer} onChange={(e) => handleCertificationsInputChange(index, e)} />
                <span/>
                Description:
                <input type="text" name="description" value={certifications.description} onChange={(e) => handleCertificationsInputChange(index, e)} />
              </label>
              {/* Add other Certifications fields similarly */}
              <button type="button" onClick={() => handleDeleteCertifications(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={handleAddCertifications}>Add More Certifications</button>
        </fieldset>

        {/* Dynamic Fields - Set 4: Skills */}
        <fieldset>
        <ListGroup.Item>Skills</ListGroup.Item> <br/>
          {formData.skills.map((skill, index) => (
            <div key={index}>
              <input type="text" value={skill} onChange={(e) => setFormData({ ...formData, skills: formData.skills.map((s, i) => i === index ? e.target.value : s) })} />
              <button type="button" onClick={() => handleDeleteSkills(index)}>Delete</button>
            </div>
          ))}
          <button type="button" onClick={() => setFormData({ ...formData, skills: [...formData.skills, ''] })}>Add More Skill</button>
        </fieldset>

        <button type="submit">Submit</button>
        </ListGroup> 
      </form>
      </div>
    </Card>
    </div>
  );
}

export default DynamicForm;
