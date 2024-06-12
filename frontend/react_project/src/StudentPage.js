import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Pagination, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentPage.css';
import StudentModal from './StudentModal';
import ConfirmationDialog from './ConfirmationDialog';

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(11);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [filterClass, setFilterClass] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/student/all');
      console.log('Fetched students:', response.data);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (studentId) => {
    setStudentIdToDelete(studentId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/user/students/${studentIdToDelete}`);
      fetchStudents(); // Refresh the student list after deletion
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdate = async (updatedStudent) => {
    try {
      console.log('updated in the frontend', updatedStudent);
      await axios.patch(`http://localhost:8080/user/students/${updatedStudent.studentId}`, updatedStudent);
      fetchStudents(); // Refresh the student list after updating
      setShowModal(false);
    } catch (error) {
      alert('Failed to update student. Please check the console for more details.');
      console.error('Error updating student:', error);
    }
  };

  const handleFilterClassChange = (e) => {
    setFilterClass(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleFilterSectionChange = (e) => {
    setFilterSection(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const filteredStudents = students.filter(student => {
    return (
      (filterClass === '' || student.class === filterClass) &&
      (filterSection === '' || student.section === filterSection) &&
      (searchQuery === '' || student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'class') {
      return a.class.localeCompare(b.class);
    }
    return 0;
  });

  // Get current students for the current page
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Container className="container">
      <div className="top-right-container">
        <div className="filters">
          <Form.Group controlId="filterClass">
            <Form.Label>Filter by Class</Form.Label>
            <Form.Control as="select" value={filterClass} onChange={handleFilterClassChange}>
              <option value="">Classes</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
              <option value="13">Class 13</option>
              <option value="14">Class 14</option>
              <option value="15">Class 15</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="filterSection">
            <Form.Label>Filter by Section</Form.Label>
            <Form.Control as="select" value={filterSection} onChange={handleFilterSectionChange}>
              <option value="">Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sortOption">
            <Form.Label>Sort By</Form.Label>
            <Form.Control as="select" value={sortOption} onChange={handleSortChange}>
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="class">Class</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="searchQuery">
            <Form.Label>Search</Form.Label>
            <Form.Control type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearchChange} />
          </Form.Group>
        </div>
        <Button variant="white" onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} /> 
        </Button>
      </div>
      <Table striped bordered hover className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Section</th>
            <th>Class</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.section}</td>
              <td>{student.class}</td>
              <td>{student.departmentId}</td>
              <td>
                <Button variant=" " onClick={()=> handleEdit(student)} className="action-button">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant=" " onClick={() => handleDelete(student.studentId)} className="action-button">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pagination">
        {[...Array(Math.ceil(students.length / studentsPerPage)).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <StudentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        student={selectedStudent}
        onSave={handleUpdate}
      />
      <ConfirmationDialog
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default StudentPage;