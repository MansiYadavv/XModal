import React, { useState, useRef, useEffect } from "react";
import "./xmodal.css"; // Ensure this has styles for .modal, .modal-content, etc.

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setErrors({ username: "", email: "", phone: "", dob: "" });
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear previous errors when field is edited
    setErrors(prev => ({ ...prev, [name]: "" }));
    
    // Validate as user types
    if (name === "phone" && value && !/^\d{10}$/.test(value)) {
      setErrors(prev => ({ ...prev, phone: "Invalid phone number. Please enter a 10-digit phone number." }));
    }
    
    if (name === "dob" && value) {
      const enteredDate = new Date(value);
      const currentDate = new Date();
      if (enteredDate > currentDate) {
        setErrors(prev => ({ ...prev, dob: "Invalid date of birth. Date cannot be in the future." }));
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", phone: "", dob: "" };
    
    if (!formData.username.trim()) {
      newErrors.username = "Please fill out this field.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please fill out this field.";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email. Please check your email address.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please fill out this field.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
      isValid = false;
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Please fill out this field.";
      isValid = false;
    } else {
      const enteredDate = new Date(formData.dob);
      const currentDate = new Date();
      if (enteredDate > currentDate) {
        newErrors.dob = "Invalid date of birth. Date cannot be in the future.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert("Form submitted successfully!");
      handleClose();
    } else {
      // Find the first error and alert it
      const errorKeys = Object.keys(errors);
      for (const key of errorKeys) {
        if (errors[key]) {
          alert(errors[key]);
          break;
        }
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Validate on blur
    if (name === "phone" && value && !/^\d{10}$/.test(value)) {
      setErrors(prev => ({ ...prev, phone: "Invalid phone number. Please enter a 10-digit phone number." }));
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    
    if (name === "dob" && value) {
      const enteredDate = new Date(value);
      const currentDate = new Date();
      if (enteredDate > currentDate) {
        setErrors(prev => ({ ...prev, dob: "Invalid date of birth. Date cannot be in the future." }));
        alert("Invalid date of birth. Date cannot be in the future.");
      }
    }
  };

  return (
    <div>
      <div className="button-container">
        <h2>User Details Modal</h2>
        <button onClick={handleOpen}>Open Form</button>
      </div>

      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
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
                {errors.username && <div className="error-text">{errors.username}</div>}
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
                {errors.email && <div className="error-text">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && <div className="error-text">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.dob && <div className="error-text">{errors.dob}</div>}
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;