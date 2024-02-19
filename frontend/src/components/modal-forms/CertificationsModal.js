// ModalForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CertificationsModalForm = ({ onSubmit, editData }) => {
  const [formData, setFormData] = useState({ title: '', field: '', issuer: '', startDate: '', endDate: '', description: '' });

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
    setFormData({ title: '', field: '', issuer: '', startDate: '', endDate: '', description: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Title</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>Field</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="field"
          value={formData.field}
          onChange={handleChange}
        />
        </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label column sm={2}>Issuer</Form.Label>
        <Col sm={10}>
        <Form.Control
          type="text"
          name="issuer"
          value={formData.issuer}
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
        <Form.Label column sm={2}>Description</Form.Label>
        <Col sm={10}>
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

export default CertificationsModalForm;
