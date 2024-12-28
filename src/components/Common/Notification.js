// src/components/Common/Notification.js
import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const className = type === 'error' ? 'alert alert-danger' : 'alert alert-success';

  return (
    <div className={className} role="alert">
      {message}
    </div>
  );
};

export default Notification;
