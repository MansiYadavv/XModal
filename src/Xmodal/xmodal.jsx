import React, { useState, useEffect, useRef } from 'react';
import './XModal.css';

const XModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const modalRef = useRef(null);

  const handleOpen = () => setShowModal(true);

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

    if (!username.trim()) return alert('Please fill out the Username field.');
    if (!email.trim()) return alert('Please fill out the Email field.');
    if (!phone.trim()) return alert('Please fill out the Phone Number field.');
    if (!dob.trim()) return alert('Please fill out the Date of Birth field.');
    if (!email.includes('@')) return alert('Invalid email address.');
    if (!/^\d{10}$/.test(phone)) return alert('Phone must be 10 digits.');
    if (new Date(dob) > new Date()) return alert('DOB cannot be in the future.');

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
    <>
      {/* White box containing heading + button */}
      <div className="modal-box">
        <h2>User Details Modal</h2>
        <button onClick={handleOpen} className="open-button">
          Open Form
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input id="username" value={formData.username} onChange={handleChange} />
              </div>
              <div>
                <label>Email:</label>
                <input id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Phone Number:</label>
                <input id="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
              </div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default XModal;
