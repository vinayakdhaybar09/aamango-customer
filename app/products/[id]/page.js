"use client";
import React, { useEffect, useState } from "react";
import "./productdetails.css";
import productImg from "../../../public/temp/main.png";
import subImgOne from "../../../public/temp/subImgOne.png";
import subImgTwo from "../../../public/temp/subImgTwo.png";
// import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../redux/cartSlice";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, database } from "@/firebase/firebaseConfig";
import axios from "axios";

// const productData = {
//   productId: 1,
//   productName: "Devgad Alphanso Mango",
//   mainImage: productImg,
//   subImgOne: subImgOne,
//   subImgTwo: subImgTwo,
//   price: 300,
// };

const page = (params) => {
  console.log(params.params.id);
  const dispacth = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [productData, setProductData] = useState();
  const [productGrade, setProductGrade] = useState("SP");
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(productData?.price);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {}
  );

  const router = useRouter();

  const isUserLogin = useSelector((state) => state?.user?.isLogin);
  console.log(isUserLogin);

  // const [itemData, setItemData] = useState()

  const getProductData = async () => {
    const docRef = doc(database, "products", params?.params?.id);
    await getDoc(docRef)
      .then((res) => {
        setProductData({ ...res.data(), id: res.id });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  console.log(productData);

  // const selectdItem = {
  //   productId: productData.productId,
  //   prodcutName: productData.productName,
  //   mainImage: productData.mainImage,
  //   grade: productGrade,
  //   totalPrice: quantity * productData.price,
  // };

  const handleDecreament = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreament = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      orderId: new Date().valueOf(),
      productId: productData?.id,
      productName: productData?.productName,
      mainImage: productData?.mainImage,
      grade: productGrade,
      price: productData?.price,
      quantity: quantity,
      totalPrice: quantity * productData?.price,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart successfull");

    // const updatedCart = {
    //   ...cart,
    //   [productData?.id]: {
    //     cartId: new Date().valueOf(),
    //     productId: productData?.id,
    //     productName: productData?.productName,
    //     mainImage: productData?.mainImage,
    //     grade: productGrade,
    //     price: productData?.price,
    //     quantity: quantity,
    //     totalPrice: quantity * productData?.price,
    //   },
    // };

    // setCart(updatedCart);

    // localStorage.setItem("cart", JSON.stringify(updatedCart));
    // toast.success("Product added to cart successfull");

    // if (isUserLogin === true) {
    //   dispacth(
    //     cartActions.addItem({
    //       cartId: new Date().valueOf(),
    //       productId: productData?.id,
    //       productName: productData?.productName,
    //       mainImage: productData?.mainImage,
    //       grade: productGrade,
    //       price: productData?.price,
    //       quantity: quantity,
    //       totalPrice: quantity * productData?.price,
    //     })
    //   );
    // } else {
    //   open();
    // }
  };

  const handleOrderProduct = async () => {
    console.log(auth.currentUser);
    if (auth.currentUser) {
      await addDoc(collection(database, "orders"), {
        uid: auth?.currentUser?.uid,
        productId: productData?.id,
        productName: productData?.productName,
        // mainImage: productData?.mainImage,
        grade: productGrade,
        price: productData?.price,
        quantity: quantity,
        totalPrice: quantity * productData?.price,
        razerpay_order_id: "1234",
        razerpay_payment_id: "5678",
        razerpay_signature: "vinay@1234",
      })
        .then(() => {
          toast.success("Order successfull");
        })
        .catch((err) => console.log(err));
    } else {
      router.push("/auth/signin");
      toast.info("you are not login , login first");
      // console.log("you are not login , login first");
    }
  };

  

  const handleCheckout = async (amount) => {
    // console.log(window);
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", {
      amount,
    });

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "aamango", //your business name
      description: "Test Transaction mango order",
      image:
        "https://example.com/your_logohttps://firebasestorage.googleapis.com/v0/b/aamango-ec8b7.appspot.com/o/products%2FsubImage2.png?alt=media&token=3f1e41e2-a93d-441c-81cd-183a9cb706ae",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://localhost:4000/api/paymentverification",
      prefill: {
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="products-details-section">
      <p className="products-details-title">{productData?.productName}</p>
      <div className="product-container">
        <div className="product-box">
          <div className="product-img-fit">
            <img
              src={productData?.mainImage}
              alt="Devgad Mango Image"
              className="product-img"
            />
          </div>
          <p className="product-name">{productData?.productName}</p>
          <div className="product-img-flex">
            <img
              className="product-img-rack"
              src={productData?.mainImage}
              alt={"main src image"}
            />
            <img
              className="product-img-rack"
              src={productData?.subImageOne}
              alt={"main src image"}
            />
            <img
              className="product-img-rack"
              src={productData?.subImageTwo}
              alt={"main src image"}
            />
          </div>
        </div>

        <div className="product-order-box">
          <div className="grade-box">
            <div
              className="grade-select"
              style={{
                backgroundColor: productGrade === "SP" ? "#851d1d" : "white",
                color: productGrade === "SP" ? "white" : "#851d1d",
              }}
              onClick={() => setProductGrade("SP")}
            >
              <p>SP</p>
            </div>
            <div
              className="grade-select"
              style={{
                backgroundColor: productGrade === "A1" ? "#851d1d" : "white",
                color: productGrade === "A1" ? "white" : "#851d1d",
              }}
              onClick={() => setProductGrade("A1")}
            >
              <p>A1</p>
            </div>
            <div
              className="grade-select"
              style={{
                backgroundColor: productGrade === "A2" ? "#851d1d" : "white",
                color: productGrade === "A2" ? "white" : "#851d1d",
              }}
              onClick={() => setProductGrade("A2")}
            >
              <p>A2</p>
            </div>
          </div>

          <div className="product-quantity">
            <AiOutlineMinus
              className="product-quantity-icons"
              onClick={handleDecreament}
            />
            <p className="product-quantity-value">{quantity}</p>
            <AiOutlinePlus
              className="product-quantity-icons"
              onClick={handleIncreament}
            />
          </div>

          <div className="product-price-flex">
            <p className="product-price">
              ₹ {quantity * productData?.price} / doz
            </p>
            <p>price per dozens</p>
          </div>
          <div className="prduct-action-btn">
            <button
              href={"/basket"}
              className="product-basket"
              onClick={handleAddToCart}
            >
              + Add to basket
            </button>
            <button
              className="product-order-btn"
              onClick={() => handleCheckout(quantity * productData?.price)}
            >
              Buy Now
            </button>
          </div>
          <Modal opened={opened} onClose={close} title="Authentication">
            <p>Hello, please login first</p>
            <Link href={"/auth/signin"} className="product-signin-btn">
              Signin
            </Link>
          </Modal>
        </div>
      </div>
      <div className="product-description">
        <p>{productData?.description}</p>
      </div>
    </div>
  );
};

export default page;
