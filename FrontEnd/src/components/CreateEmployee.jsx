// src/components/CreateEmployee.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    course: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeData({ ...employeeData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save employee data can be implemented here
    console.log('Employee Data:', employeeData);
    alert('Employee created successfully!');
    navigate('/dashboard/employees'); // Redirect to employee list after submission
  };

  return (
    <div>
      <h2>Create New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employeeData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile No:</label>
          <input type="text" name="mobile" value={employeeData.mobile} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} required />
        </div>
        <div>
          <label>Course:</label>
          <input type="text" name="course" value={employeeData.course} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} required />
        </div>
        <button type="submit">Create Employee</button>
      </form>
      <button onClick={() => navigate('/dashboard/employees')} style={{ marginTop: '10px' }}>
        Go to Employee List
      </button>
    </div>
  );
}

export default CreateEmployee;
