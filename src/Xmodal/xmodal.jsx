import React, { useState, useEffect, useRef } from 'react';
import './xmodal.css';

const XModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const modalRef = useRef(null);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ username: '', email: '', phone: '', dob: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    if (!username.trim()) {
      alert('Please fill out the Username field.');
      return;
    }
    if (!email.trim()) {
      alert('Please fill out the Email field.');
      return;
    }
    if (!phone.trim()) {
      alert('Please fill out the Phone Number field.');
      return;
    }
    if (!dob.trim()) {
      alert('Please fill out the Date of Birth field.');
      return;
    }

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const enteredDate = new Date(dob);
    const currentDate = new Date();
    if (enteredDate > currentDate) {
      alert('Invalid date of birth. Please select a valid date.');
      return;
    }

    alert('Form submitted successfully!');
    handleClose();
  };

  const handleOutsideClick = (e) => {
    if (showModal && modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  return (
    <div className="modal-container">
      <div className="modal-box">
        <h2>User Details Modal</h2>
        {!showModal && (
          <button onClick={handleOpen} className="open-button">
            Open Form
          </button>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h3>Fill the Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input id="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input id="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
              </div>
              <div className="form-actions">
                <button className="submit-button" type="submit">Submit</button>
                <button type="button" className="cancel-button" onClick={handleClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
