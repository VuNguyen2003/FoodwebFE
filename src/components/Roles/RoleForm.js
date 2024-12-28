// src/components/Roles/RoleForm.js
import React, { useState, useEffect } from 'react';
import { createRole, getRoleById, updateRole } from '../../api/api';
import { useHistory, useParams } from 'react-router-dom';
import InputField from '../Common/InputField';
import Notification from '../Common/Notification';

const RoleForm = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchRole = async () => {
    try {
      const response = await getRoleById(id);
      setName(response.data.name);
    } catch (error) {
      setNotification({ message: 'Failed to fetch role details.', type: 'error' });
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchRole();
    }
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateRole(id, { name });
        setNotification({ message: 'Role updated successfully!', type: 'success' });
      } else {
        await createRole({ name });
        setNotification({ message: 'Role created successfully!', type: 'success' });
      }
      navigate('/roles');
    } catch (error) {
      setNotification({ message: 'Operation failed.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Edit Role' : 'Add New Role'}</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Role Name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default RoleForm;
