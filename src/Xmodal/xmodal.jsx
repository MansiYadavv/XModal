import React, { useState, useRef, useEffect } from "react";
import "./xmodal.css"; // Ensure this exists or create it

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
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
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

    if (!username.trim()) {
      alert("Please fill out this field.");
      return;
    }

    if (!email.trim()) {
      alert("Please fill out this field.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please include @ in the email address.");
      return;
    }

    if (!phone.trim()) {
      alert("Please fill out this field.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (!dob.trim()) {
      alert("Please fill out this field.");
      return;
    }

    const enteredDate = new Date(dob);
    const currentDate = new Date();
    if (enteredDate > currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    alert("Form submitted successfully!");
    handleClose();
  };

  return (
    <div>
    {/* White box containing heading + button */}
    <div className="modal-box">
      <h2>User Details Modal</h2>
      <button onClick={handleOpen} className="open-button">
        Open Form
      </button>
    </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-box" ref={modalRef}>
            <h2>User Details Modal</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
