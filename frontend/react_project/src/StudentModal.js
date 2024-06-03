import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StudentModal = ({ show, onHide, student, onSave }) => {
  const [updatedStudent, setUpdatedStudent] = useState({});

  useEffect(() => {
    if (student) {
      setUpdatedStudent(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedStudent);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="studentName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedStudent.name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="studentSection">
            <Form.Label>Section</Form.Label>
            <Form.Control
              type="text"
              name="section"
              value={updatedStudent.section || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="studentClass">
            <Form.Label>Class</Form.Label>
            <Form.Control
              type="text"
              name="class"
              value={updatedStudent.class || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="studentDepartmentId">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="departmentId"
              value={updatedStudent.departmentId || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;