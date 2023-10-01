"use client"
import React from "react";
import "./checkout.css";
import { FiUser } from "react-icons/fi";
import { BsTelephone, BsBuildings } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { BiMapPin } from "react-icons/bi";
import { MdOutlinePin } from "react-icons/md";
import mainImage from "../../public/temp/main.png";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Userdetails from "@/components/userdetails/Userdetails";
import { useSelector } from "react-redux";


const products = [
  {
    grade: "A1",
    productId: 1,
    mainImage: mainImage,
    productName: "Devgad Alphanso Mango",
    quantity: 3,
    totalPrice: 900,
  },
  {
    grade: "A1",
    productId: 1,
    mainImage: mainImage,
    productName: "Devgad Alphanso Mango",
    quantity: 3,
    totalPrice: 900,
  },
];

const page = () => {

  const packagingCharges = 10
  const deliveryCharges = 40;

  const totalQty = useSelector(state => state?.cart?.totalQuantity)
  const totalAmount = useSelector(state => state?.cart?.totalAmount)

  const isUserLogin = useSelector(state => state?.user?.isLogin)
  console.log(isUserLogin);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="checkout-section">
      <p className="checkout-title">Checkout</p>
      <div className="checkout-container">
        <div className="checkout-info">
          <div className="checkout-user-info">
            <div className="checkout-info-flex">
              <FiUser />
              <p>Vinayak Ankush Dhaybar</p>
            </div>

            <div className="checkout-info-flex">
              <BsTelephone />
              <p>+ 9876543210</p>
            </div>

            <div className="checkout-info-flex">
              <HiOutlineMail />
              <p>vinayakdhaybar09@gmail.com</p>
            </div>

            <div className="checkout-info-flex">
              <SlLocationPin />
              <p>lane no. 3, kalyani nagar, pune, 411006</p>
            </div>

            <div className="checkout-info-flex">
              <BiMapPin />
              <p>Maharashtra</p>
            </div>

            <div className="checkout-info-flex">
              <BsBuildings />
              <p>Pune</p>
            </div>

            <div className="checkout-info-flex">
              <MdOutlinePin />
              <p>411014</p>
            </div>

            <p className="edit-details-btn" onClick={open}>
              Edit details
            </p>
            <Modal opened={opened} onClose={close} title="Authentication">
              <Userdetails/>
            </Modal>
          </div>

          <div className="checkout-product-info">
            <p className="price-details-title">Price details</p>
            <div className="checkout-product-flex">
              <p className="checkout-product-key">Subtotal</p>
              <p className="checkout-product-value">₹ {totalAmount}</p>
            </div>
            <div className="checkout-product-flex">
              <p className="checkout-product-key">Packaging charges</p>
              <p className="checkout-product-value">₹ {packagingCharges}</p>
            </div>
            <div className="checkout-product-flex">
              <p className="checkout-product-key">Delivery charges</p>
              <p className="checkout-product-value">₹ {deliveryCharges}</p>
            </div>

            <hr />
            <div className="checkout-product-flex">
              <p className="checkout-product-key">Total price</p>
              <p className="checkout-product-value">₹ {totalAmount + packagingCharges + deliveryCharges}</p>
            </div>

            <p className="place-order-btn">Place an order</p>
          </div>
        </div>
        <div className="checkout-products">
          <p className="product-details-title">Products</p>
          {products?.map((item, index) => {
            return (
              <div className="basket-box" key={index}>
                <div className="basket-flex">
                  <div className="img-box">
                    <Image
                      className="product-img"
                      src={mainImage}
                      alt={"Product Image"}
                    />
                  </div>
                  <p className="basket-product-title">{item.productName}</p>
                </div>
                <div className="basket-flex">
                  <p>{item.grade}</p>
                  <p>{item.quantity} doz</p>
                  <p>₹ {item.totalPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
