"use client";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./products.css";
// import productImg from "../../public/temp/main.png";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/firebase/firebaseConfig";
// import { Group, HoverCard } from "@mantine/core";

// const productData = [
//   {
//     productId: 1,
//     productName: "Devgad Mango",
//     mainImage: productImg,
//     price: 300,
//   },
//   {
//     productId: 2,
//     productName: "Hapus Mango",
//     mainImage: productImg,
//     price: 350,
//   },
//   {
//     productId: 3,
//     productName: "Payari Mango",
//     mainImage: productImg,
//     price: 400,
//   },
// ];

const page = () => {
  const [productData, setProductData] = useState();

  const getAllProducts = async () => {
    getDocs(collection(database, "products"))
      .then((res) => {
        setProductData(
          res?.docs?.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(productData);

  return (
    <div className="products-section">
      <p className="products-title">aamango types</p>
      <div className="product-container">
        {productData?.map((item) => {
          return (
            <div key={item.id}>
              <Link
                href={`/products/${item.id}`}
                key={item.productId}
                className="product-box"
              >
                <BsFillInfoCircleFill className="prodcut-info" />
                <img
                  src={item.mainImage}
                  alt="Devgad Mango Image"
                  className="product-img"
                  width={230}
                  height={230}
                />
                <p className="product-name">{item.productName}</p>
                <p className="product-price">₹ {item.price}/ doz.</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;

// export async function generateStaticParams() {
//   const [productData, setProductData] = useState();

//   const getAllProducts = async () => {
//     getDocs(collection(database, "products"))
//       .then((res) => {
//         setProductData(
//           res.docs.map((item) => {
//             return { ...item.data(), id: item.id };
//           })
//         );
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//    useEffect(() => {
//      getAllProducts();
//    }, []);

//   console.log(productData);
// }
