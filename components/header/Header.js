"use client";
import React, { useEffect, useState } from "react";
import "./header.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { Burger, Drawer } from "@mantine/core";
import { auth } from "@/firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "@/redux/userSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const title = opened ? "Close navigation" : "Open navigation";
  const [userLink, setUserLink] = useState("/auth/signin");

  const totalCartItem = useSelector((state) => state.cart.totalQuantity);

  const isUserLogin = useSelector((state) => state?.user?.isLogin);
  // console.log(isUserLogin);

  const handleNavigate = (path) => {
    dispatch(checkLogin());
    router.push(path);
  };

  return (
    <div className="header-style">
      <p
        className="logo"
        onClick={() => {
          console.log(auth.currentUser);
          console.log(isUserLogin);
        }}
      >
        aamango
      </p>
      <div className="header-options">
        <div className="header-options-pages">
          <Link href={"/"} className="pages">
            Home
          </Link>
          <p className="pages" onClick={() => handleNavigate("/products")}>
            Products
          </p>
          <Link href={"/auth/signin"} className="pages">
            About Us
          </Link>
          <Link href={"/contactus"} className="pages">
            Contact Us
          </Link>
        </div>
        <p onClick={() => handleNavigate("/basket")}>
          <MdOutlineShoppingBag className="cart-icon" />
          <span className="basket-total-items">{totalCartItem}</span>
        </p>
        <p onClick={() => handleNavigate("/profile")}>
          <FaUser className="user-icon" />
        </p>
        <Burger
          opened={opened}
          title={title}
          onClick={() => setOpened(true)}
          // color={"white"}
          className="menu-btn"
        />
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title=""
          padding="xl"
          size="xs"
          position="left"
          className="drawer-option"
        >
          <div className="header-drawer-options">
            <Link
              onClick={() => setOpened(false)}
              href={"/"}
              className="drawer-pages"
            >
              Home
            </Link>
            <p
              onClick={() => {
                setOpened(false);
                handleNavigate("/products");
              }}
              // onClick={() => setOpened(false)}
              className="drawer-pages"
            >
              Products
            </p>
            <Link
              onClick={() => setOpened(false)}
              href={"aboutus"}
              className="drawer-pages"
            >
              About Us
            </Link>
            <Link
              onClick={() => setOpened(false)}
              href={"contactus"}
              className="drawer-pages"
            >
              Contact Us
            </Link>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
