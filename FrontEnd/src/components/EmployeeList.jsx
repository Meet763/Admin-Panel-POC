// src/components/EmployeeList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const navigate = useNavigate();

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '123-456-7890',
      designation: 'Software Engineer',
      course: 'React',
      createDate: '2023-01-15',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      mobile: '987-654-3210',
      designation: 'Product Manager',
      course: 'Node.js',
      createDate: '2023-02-20',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      mobile: '456-123-7890',
      designation: 'Designer',
      course: 'UI/UX',
      createDate: '2023-03-10',
      image: 'https://via.placeholder.com/50'
    }
  ];

  const handleEdit = (id) => {
    alert(`Edit employee with id ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete employee with id ${id}`);
  };

  return (
    <div>
      <h3>Employee List</h3>
      <button onClick={() => navigate('/dashboard/employees/create')}>Create Employee</button>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile No</th>
            <th style={styles.th}>Designation</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Create Date</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} style={styles.tr}>
              <td style={styles.td}>{employee.id}</td>
              <td style={styles.td}>
                <img src={employee.image} alt={`${employee.name}`} style={styles.image} />
              </td>
              <td style={styles.td}>{employee.name}</td>
              <td style={styles.td}>{employee.email}</td>
              <td style={styles.td}>{employee.mobile}</td>
              <td style={styles.td}>{employee.designation}</td>
              <td style={styles.td}>{employee.course}</td>
              <td style={styles.td}>{employee.createDate}</td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => handleEdit(employee.id)}>Edit</button>
                <button style={styles.button} onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' },
  td: { border: '1px solid #ddd', padding: '8px' },
  tr: { borderBottom: '1px solid #ddd' },
  button: { margin: '0 5px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' },
  image: { width: '50px', height: '50px', borderRadius: '50%' }
};

export default EmployeeList;
