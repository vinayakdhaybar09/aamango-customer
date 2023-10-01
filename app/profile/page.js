"use client";
import React, { useState } from "react";
import "./profile.css";
import { FiUser, FiEdit } from "react-icons/fi";
import productImg from "../../public/temp/main.png";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "@/redux/userSlice";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [component, setComponent] = useState("Profile");

  const isUserLogin = useSelector((state) => state?.user?.isLogin);

  const handleSelect = (state) => {
    // console.log(state);
    setComponent(state);
  };

  const handleSignout = () => {
    if (auth.currentUser) {
      signOut(auth);
      dispatch(checkLogin());
      localStorage.removeItem("login");
      toast.success("Logout successfull");
      router.push("/auth/signin");
    } else {
      toast.error("You are not login, please login first");
    }
  };

  return (
    <div className="profile-section">
      <p className="profile-title">{component}</p>
      {auth.currentUser ? (
        <div className="profile-grid">
          <div className="profile-options">
            <p
              style={{
                backgroundColor:
                  component === "Profile" ? "#851d1d" : "transparent",
                color: component === "Profile" ? "#fff" : "#851d1d",
              }}
              onClick={() => handleSelect("Profile")}
            >
              Profile
            </p>
            <p
              style={{
                backgroundColor:
                  component === "Order Status" ? "#851d1d" : "transparent",
                color: component === "Order Status" ? "#fff" : "#851d1d",
              }}
              onClick={() => handleSelect("Order Status")}
            >
              Order Status
            </p>
            <p
              style={{
                backgroundColor:
                  component === "Order History" ? "#851d1d" : "transparent",
                color: component === "Order History" ? "#fff" : "#851d1d",
              }}
              onClick={() => handleSelect("Order History")}
            >
              Order History
            </p>
            <p
              style={{
                backgroundColor:
                  component === "Order History" ? "#851d1d" : "transparent",
                color: component === "Order History" ? "#fff" : "#851d1d",
              }}
              onClick={() => handleSignout()}
            >
              Logout
            </p>
          </div>
          <div className="profile-selected-options">
            {component === "Profile" ? (
              <ProfileComponent />
            ) : component === "Order Status" ? (
              <OrderStatus />
            ) : component === "Order History" ? (
              <OrderHistory />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="profile-message-box">
          <p>You are not login, please login first</p>
          <button className="profile-login-btn">Login</button>
        </div>
      )}
    </div>
  );
};

export default page;

const ProfileComponent = () => {
  return (
    <div className="profile-option">
      <FiUser className="profile-user-icon" />
      <p className="edit-icon">
        <FiEdit /> Edit
      </p>
      <div className="user-data">
        <p className="data-label">Name</p>
        <p className="data-value">Vinayak Dhaybar</p>
      </div>
      <div className="user-data">
        <p className="data-label">Contact No.</p>
        <p className="data-value">1122334455</p>
      </div>
      <div className="user-data">
        <p className="data-label">Email Id</p>
        <p className="data-value">abcD@gmail.com</p>
      </div>
      <div className="user-data">
        <p className="data-label">Address</p>
        <p className="data-value">
          23/24, soapn nagar, wadgaonsheri, pune, 411014
        </p>
      </div>
    </div>
  );
};

const OrderStatus = () => {
  return (
    <div className="basket-container">
      <div className="basket-box">
        <div className="img-box">
          <Image
            className="product-img"
            src={productImg}
            alt={"Product Image"}
          />
        </div>
        <p>Ratnagiri Alphonso Mango</p>
        <p>SP</p>
        <p>3 doz</p>
        <p>₹ 500</p>
      </div>
      <div className="user-data">
        <p className="data-label">Order Status</p>
        <p className="data-value">Dispatch</p>
      </div>
      <div className="user-data">
        <p className="data-label">Delivery Date</p>
        <p className="data-value">09/09/2023</p>
      </div>
      <div className="user-data">
        <p className="data-label">Contact No.</p>
        <p className="data-value">1122334455</p>
      </div>
      <div className="user-data">
        <p className="data-label">Address</p>
        <p className="data-value">
          23/24, soapn nagar, wadgaonsheri, pune, 411014
        </p>
      </div>
      <div className="user-data">
        <p className="data-label">Order Date</p>
        <p className="data-value">01/09/2023</p>
      </div>

      <p className="query-message">For any query contact on 1122334455</p>
    </div>
  );
};

const OrderHistory = () => {
  return (
    <div className="basket-container">
      <div className="basket-box">
        <div className="img-box">
          <Image
            className="product-img"
            src={productImg}
            alt={"Product Image"}
          />
        </div>
        <p>09/10/2023</p>
        <p>Ratnagiri Alphonso Mango</p>
        <p>SP</p>
        <p>3 doz</p>
        <p>₹ 500</p>
      </div>
    </div>
  );
};
