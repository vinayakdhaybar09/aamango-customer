import React from "react";
import "./contactus.css";
import { BsWhatsapp } from "react-icons/bs";
import { FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";

const page = () => {
  return (
    <div className="contactus-section">
      <h1 className="contactus-title">Contact Us</h1>
      <p className="contactus-content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
        facilis eos, harum rerum illo non doloremque quo aut distinctio dolorem
        fuga ipsum suscipit cumque hic, velit dicta ipsa delectus ex
        consequuntur s quibusdam soluta voluptates. Distinctio eum maxime
        laboriosam hic sit cum dolorem animi reprehenderit. Velit neque facilis,
        ex numquam quidem sed suscipit incidunt porro alias voluptas. Ratione
        repellendus doloribus fugit a aliquid.
      </p>
      <div className="contactus-whatsapp-btn">
        <p></p>
        <p> Whatsapp us</p>
        <div className="contactus-whatsapp-box">
          <BsWhatsapp className="contactus-whatsapp-icon" />
        </div>
      </div>
      <div className="contactus-media-icons">
        <FaInstagramSquare />
        <FaFacebookSquare />
      </div>
    </div>
  );
};

export default page;
