// src/components/PaymentMethods/PaymentMethodForm.js
import React, { useState, useEffect } from 'react';
import { createPaymentMethod, getPaymentMethodById, updatePaymentMethod } from '../../api/api';
import { useHistory, useParams } from 'react-router-dom';
import InputField from '../Common/InputField';
import Notification from '../Common/Notification';

const PaymentMethodForm = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchPaymentMethod = async () => {
    try {
      const response = await getPaymentMethodById(id);
      setName(response.data.name);
    } catch (error) {
      setNotification({ message: 'Failed to fetch payment method details.', type: 'error' });
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchPaymentMethod();
    }
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updatePaymentMethod(id, { name });
        setNotification({ message: 'Payment method updated successfully!', type: 'success' });
      } else {
        await createPaymentMethod({ name });
        setNotification({ message: 'Payment method created successfully!', type: 'success' });
      }
      navigate('/payment-methods');
    } catch (error) {
      setNotification({ message: 'Operation failed.', type: 'error' });
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Edit Payment Method' : 'Add New Payment Method'}</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <InputField label="Payment Method" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
