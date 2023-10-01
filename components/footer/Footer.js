import Link from "next/link";
import React from "react";
import "./footer.css";
import {
  FaInstagramSquare,
  FaFacebookSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-log-box">
        <h1 className="footer-logo">aamango</h1>
        <div className="footer-media-icons">
          <FaWhatsappSquare />
          <FaFacebookSquare />
          <FaInstagramSquare />
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-pages">
          <Link href={""}>Home</Link>
          <Link href={""}>Products</Link>
          <Link href={""}>About Us</Link>
          <Link href={""}>Contact Us</Link>
        </div>
        <div className="footer-pages">
          <p>Terms & Conditions</p>
          <p>Return & Refund Policy</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
