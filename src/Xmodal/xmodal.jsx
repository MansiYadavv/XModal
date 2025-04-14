import React, { useState, useRef, useEffect } from "react";
import "./xmodal.css";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // Username validation
    if (!username.trim()) {
      alert("Please fill out this field.");
      return;
    }

    // Email validation
    if (!email.trim()) {
      alert("Please fill out this field.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please include @ in the email address.");
      return;
    }

    // Phone validation - Check format before emptiness
    if (phone.trim() && !/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (!phone.trim()) {
      alert("Please fill out this field.");
      return;
    }

    // DOB validation - Check future date before emptiness
    if (dob.trim()) {
      const enteredDate = new Date(dob);
      const currentDate = new Date();
      if (enteredDate > currentDate) {
        alert("Invalid date of birth. Date of birth cannot be in the future.");
        return;
      }
    }

    if (!dob.trim()) {
      alert("Please fill out this field.");
      return;
    }

    alert("Form submitted successfully!");
    handleClose();
  };

  return (
    <div>
      <div className="button-container">
        <h2>User Details Modal</h2>
        <button onClick={handleOpen} className="open-button">
          Open Form
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <h2>Fill Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;