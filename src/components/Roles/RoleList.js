// src/components/Roles/RoleList.js
import React, { useState, useEffect } from 'react';
import { getAllRoles, deleteRole } from '../../api/api';
import { Link } from 'react-router-dom';
import Notification from '../Common/Notification';

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchRoles = async () => {
    try {
      const response = await getAllRoles();
      setRoles(response.data);
    } catch (error) {
      setNotification({ message: 'Failed to fetch roles.', type: 'error' });
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(id);
        setNotification({ message: 'Role deleted successfully.', type: 'success' });
        fetchRoles();
      } catch (error) {
        setNotification({ message: 'Failed to delete role.', type: 'error' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Roles</h2>
      <Notification message={notification.message} type={notification.type} />
      <Link to="/roles/create" className="btn btn-success mb-3">Add New Role</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <Link to={`/roles/edit/${role.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                <button onClick={() => handleDelete(role.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
