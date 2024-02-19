// SkillsModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Badge, Row, Col } from 'react-bootstrap';

const SkillsModal = ({ show, handleClose, onSubmit }) => {
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);

  const handleAddSkill = () => {
    if (skill.trim() !== '') {
      setSkills([...skills, skill]);
      setSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSubmit = () => {
    onSubmit(skills);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Skills</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group as={Row}>
      <Col sm={9}>
        <Form.Control
          type="text"
          placeholder="Type individual skill and click enter / add"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          //Add skill when enter is pressed:-
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        </Col>
        <Col sm={3}>
        <Button variant="primary" onClick={handleAddSkill} style={{width: 100}}>
          Add
        </Button>
        </Col>
        </Form.Group>
        <div style={{ marginTop: '10px' }}>
          {skills.map((skill, index) => (
            <Badge key={index} pill variant="primary" style={{ margin: '5px', paddingLeft: '10px' }}>
              {skill}
              <Button
                variant="primary"
                size="sm"
                style={{ marginLeft: '5px', height: 17, marginTop: '7px' }}
                onClick={() => handleRemoveSkill(index)}
              >
                <b>X</b>
              </Button>
            </Badge>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SkillsModal;
