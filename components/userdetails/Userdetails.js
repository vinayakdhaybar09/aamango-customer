import React from "react";
import "./userdetails.css";

const Userdetails = () => {
  return (
    <div className="user-details-container">
      <label className="user-details-input-label">Name</label>
      <div className="flex-input-box">
        <input className="input-user-box-half" type="text" placeholder="First Name" />
        <input className="input-user-box-half" type="text" placeholder="Middle Name" />
        <input className="input-user-box-half" type="text" placeholder="Last Name" />
      </div>
      <label className="user-details-input-label">Contact No:</label>
      <input className="input-user-box-full" type="number" placeholder="Mobile no." />
      <label className="user-details-input-label">Email Id</label>
      <input className="input-user-box-full" type="email" placeholder="Email id." />
      <label className="user-details-input-label">Address</label>
      <input className="input-user-box-full" type="text" placeholder="Address" />
      <div className="flex-input-box">
        <div className="flex-vertical-input">
          <label className="user-details-input-label">State</label>
          <input className="input-user-box" type="text" placeholder="State" />
        </div>
        <div className="flex-vertical-input">
          <label className="user-details-input-label">City</label>
          <input className="input-user-box" type="text" placeholder="City" />
        </div>
        <div className="flex-vertical-input">
          <label className="user-details-input-label">Pin Code</label>
          <input className="input-user-box" type="number" placeholder="Pin Code" />
        </div>
      </div>
      <button className="submit-btn-style">Submit</button>
    </div>
  );
};

export default Userdetails;
