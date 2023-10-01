import React from "react";
import "./testimonials.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import user1 from "../../public/images/user1.png";
import Image from "next/image";

const Testimonials = () => {
  return (
    <div className="testimonial-section">
      <h1 className="testimonial-title">What our customers says</h1>
      <div className="testimonial-container">
        <div className="testimonial-box">
          <Image
            src={user1}
            alt="testimonial image"
            className="testimonial-user"
          />
          <div className="testimonial-user-info">
            <FaQuoteLeft className="left-quote" />
            <p>
              The quality and freshness were not compromised in any way, It is
              one of the best batches of mangoes I have had in a while. Thank
              you team Mango Basket.
            </p>
            <FaQuoteRight className="right-quote" />
          </div>
          <p>Seema Jadhav</p>
          <strong>Pune</strong>
        </div>

        <div className="testimonial-box">
          <Image
            src={user1}
            alt="testimonial image"
            className="testimonial-user"
          />
          <div className="testimonial-user-info">
            <FaQuoteLeft className="left-quote" />
            <p>
              The quality and freshness were not compromised in any way, It is
              one of the best batches of mangoes I have had in a while. Thank
              you team Mango Basket.
            </p>
            <FaQuoteRight className="right-quote" />
          </div>
          <p>Seema Jadhav</p>
          <strong>Pune</strong>
        </div>

        <div className="testimonial-box">
          <Image
            src={user1}
            alt="testimonial image"
            className="testimonial-user"
          />
          <div className="testimonial-user-info">
            <FaQuoteLeft className="left-quote" />
            <p>
              The quality and freshness were not compromised in any way, It is
              one of the best batches of mangoes I have had in a while. Thank
              you team Mango Basket.
            </p>
            <FaQuoteRight className="right-quote" />
          </div>
          <p>Seema Jadhav</p>
          <strong>Pune</strong>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
