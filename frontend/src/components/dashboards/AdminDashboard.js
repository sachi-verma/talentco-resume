// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { fetchAdminData } from '../../services/apiService';
import { logout, isAuthenticated } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';


const AdminDashboard = () => {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  // Define fetchResumes function
  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  // Fetch resumes when component mounts
  useEffect(() => {
    fetchResumes();
  }, []);

  // const fetchIndividual = async(id) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/api/resumes/${id}`)
  //     setResumes(response.data);
  //   } catch (error) {
  //     console.error('Error fetching resumes:', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchIndividual();
  // }, []);

  // const handleDeleteResume = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/api/resumes/` + id);
  //     alert('Resume deleted successfully!');
  //     // Refresh the list of resumes
  //     fetchResumes();
  //   } catch (error) {
  //     console.error('Error deleting resume:', error);
  //     alert('Error deleting resume. Please try again.');
  //   }
  // };

  // const {id} = useParams();

  const handleDeleteResume = async (id) => {
    console.log('Deleting resume with ID (frontend):', id);
    try {
      // const response = await axios.delete("http://localhost:3001/api/resumes/"+id);
      const response = await axios({
        url: 'http://localhost:3001/api/resumes/' + id, 
        method: 'DELETE'
      })
      console.log('Server response:', response);
      alert('Resume deleted successfully!');
      // Refresh the list of resumes
      fetchResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Error deleting resume. Please try again.');
    }
  };

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const downloadResumePDF = async (resume) => {
    //console.log('Downloading resume with ID (frontend):', id);
    const pdf = new jsPDF();
    // const response = await axios.get('http://localhost:3001/api/resumes'+id);
    // Add content to the PDF, for example:
    // pdf.text(20, 20, `Candidate Name: ${response.data}`);
    // Add more text and formatting as needed
    // pdf.save('resume.pdf');
    try {
      // const response = await axios.delete("http://localhost:3001/api/resumes/"+id);
      // const response = await axios({
      //   url: 'http://localhost:3001/api/resumes/' + id, 
      //   method: 'GET'
      // })
      // console.log('Server response:', response);
      pdf.text(20, 20, `Candidate Name: ${resume.candidate_name} \nCandidate email: ${resume.email} \nCandidate phone: ${resume.phone}`); 
      // pdf.text(20, 20, `Candidate email: ${resume.email}`); 
      // pdf.text(20, 20, `Candidate phone: ${resume.phone}`); 
      pdf.save('resume.pdf');
      alert('Resume downloading!');
      // Refresh the list of resumes
      // fetchResumes();
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Error downloading resume. Please try again.');
    }
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
      <h2>Admin Dashboard</h2>
      <div className='d-flex justify-content-end'>
      <button className='btn btn-secondary' onClick={handleLogout}>Logout</button>
      </div>
      {/* <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>
            <p>Candidate Name: {resume.candidate_name}</p>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            <button class="btn btn-sm btn-danger" onClick={() => handleDeleteResume(resume.id)}>
              Delete Resume
            </button>
          </li>
        ))}
      </ul> */}
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {resumes.map((resume) => (
          <tr key={resume.id}>
            <td> {resume.candidate_name}</td>
            <td> {resume.email}</td>
            <td> {resume.phone}</td>
            <td>
            <button class="btn btn-sm btn-danger" onClick={() => handleDeleteResume(resume.id)}>
              Delete Resume
            </button>
            </td>
            <td>
            <button className="btn btn-sm btn-success" onClick={() => downloadResumePDF(resume)}>
              Download Resume
            </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminDashboard;


