// ModalForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FormCheck } from 'react-bootstrap';

const ExperienceModalForm = ({ onSubmit, editData }) => {
  const [formData, setFormData] = useState({ jobTitle: '', company: '', startDate: '', endDate: '', currentlyWorking: false, location: '', description: '' });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ jobTitle: '', company: '', startDate: '', endDate: '', currentlyWorking: false, location: '', description: '' });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Job Title</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Company</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label column sm={2}>Location</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>Start Date</Form.Label>
        <Col sm={9}>
        <Form.Control
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
          <Col sm={{ span: 5, offset: 0 }} className="justify-content-start align-items-start">
            <Form.Check
              reverse
              type="checkbox"
              label="Currently Working?"
              name="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={handleCheckboxChange}
              style={{marginLeft: 0}}
            />
          </Col>
        </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>End Date</Form.Label>
        <Col sm={9}>
        <Form.Control
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          disabled={formData.currentlyWorking}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>Description</Form.Label>
        <Col sm={9}>
        <Form.Control
        //   type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          as="textarea" 
          rows={3}
        />
        </Col>
        </Form.Group>
      <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
    </Form>
  );
};

export default ExperienceModalForm;
