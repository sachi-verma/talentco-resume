// ModalForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const EducationModalForm = ({ onSubmit, editData }) => {
  const [formData, setFormData] = useState({ institute: '', degree: '', specialization: '', startDate: '', endDate: '', grade: '', description: '' });

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
    const mappedData = {
        institute: formData.institute,
        degree: formData.degree,
        specialization: formData.specialization,
        start_date: formData.startDate,
        end_date: formData.endDate,
        grade: formData.grade,
        description: formData.description
      };
    onSubmit(mappedData);
    setFormData({ institute: '', degree: '', specialization: '', startDate: '', endDate: '', grade: '', description: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Institute</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="institute"
          value={formData.institute}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Degree</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>Specialization</Form.Label>
        <Col sm={9}>
        <Form.Control
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Grade</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="grade"
          value={formData.grade}
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
        <Form.Label column sm={3}>End Date</Form.Label>
        <Col sm={9}>
        <Form.Control
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={3}>Description</Form.Label>
        <Col sm={9}>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
    </Form>
  );
};

export default EducationModalForm;
