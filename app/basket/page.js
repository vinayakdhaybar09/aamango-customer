"use client";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./basket.css";
import productImg from "../../public/temp/main.png";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/redux/cartSlice";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter()
  const [cartData, setCartData] = useState();

  const handleDeleteFromCart = (orderId) => {
    let storageProducts = JSON.parse(localStorage.getItem("cart"));
    let products = storageProducts.filter(
      (product) => product.orderId !== orderId
    );
    localStorage.setItem("cart", JSON.stringify(products));
  };

  const getCartData = async () => {
    const cart = await localStorage.getItem("cart");
    setCartData(JSON.parse(cart));
  };

  useEffect(() => {
    getCartData();
  }, []);

  console.log(cartData);

  const totalAmount = cartData?.reduce(
    (acc, item) => acc + Number(item.totalPrice),
    0
  );

  const handleOrderProduct = async () => {
    console.log(auth.currentUser);
    if (auth.currentUser) {
      await addDoc(collection(database, "orders"), {
        orderId: new Date().valueOf(),
        totalAmount:totalAmount,
        products: cartData,
      })
        .then(() => {
          toast.success("Order successfull");
        })
        .catch((err) => console.log(err));
    } else {
      router.push("/auth/signin");
      toast.info("you are not login , login first");
    }
  };

  return (
    <div className="basket-section">
      <p className="basket-title">My Basket</p>
      <div className="basket-container">
        {cartData?.length === 0 ? (
          <div className="empty-basket-box">
            <h2 className="empty-basket-title">No item added To the basket</h2>
            <Link href={"/products"} className="products-link-btn">
              order some mangoes
            </Link>
          </div>
        ) : (
          cartData?.map((item, index) => {
            return (
              <div className="basket-box" key={index}>
                <div className="basket-flex">
                  <div className="img-box">
                    <img
                      className="product-img"
                      src={item.mainImage}
                      alt={"Product Image"}
                    />
                  </div>
                  <p className="basket-product-title">{item.productName}</p>
                </div>
                {/* <div className="product-quantity">/ */}
                {/* <p className="product-quantity-value">{item.quantity}</p> */}
                {/* <AiOutlinePlus className="product-quantity-icons" /> */}
                {/* <AiOutlineMinus className="product-quantity-icons" /> */}
                {/* </div> */}
                <div className="basket-flex">
                  {/* <p>{item.grade}</p> */}
                  <p>{item.quantity} doz</p>
                  <p>₹ {item.totalPrice}</p>
                  <AiFillDelete
                    className="delete-cart-icon"
                    onClick={() => handleDeleteFromCart(item.orderId)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="empty-basket-box">
        <Link href={"/products"} className="products-link-btn">
          + update basket
        </Link>
      </div>
      {cartData?.length === 0 ? null : (
        <div className="basket-checkout">
          <p className="basket-total-price">GRAND TOTAL : ₹{totalAmount}</p>
          <button onClick={handleOrderProduct} className="checkout-btn">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
