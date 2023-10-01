"use client";
import React, { useState } from "react";
import "./signin.css";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, database } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
// import { firestoreAddData } from "@/services/operations";
import { toast } from "react-toastify";
import { checkLogin, createUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        localStorage.setItem("login", true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log(res);
        console.log("email is successfully sent to your email id");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignin = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await setDoc(doc(database, "users", res?.user?.uid), {
      userid: res?.user?.uid,
      name: res?.user?.displayName,
      email: res?.user?.email,
      contactNo: res?.user?.phoneNumber,
      address: null,
      orderHistory: null,
    })
      .then(() => {
        toast.success("Login Successfully");
        dispatch(checkLogin())
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signin-section">
      <div className="sigin-box">
        <h1 className="signin-title">Welcome.</h1>
        <div className="signin-google-box" onClick={handleGoogleSignin}>
          <FcGoogle className="google-icon" />
          <p className="google-signin-btn">Sign in with Google</p>
        </div>
        <p className="signin-divider">Or, sign in with your email</p>
        <form className="form-style" onSubmit={(e) => handleSubmitForm(e)}>
          <label className="input-label">E-mail id</label>
          <input
            type="email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="input-label">Password</label>
          <input
            type="password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="forget-field" onClick={handleForgetPassword}>
            Forgot Password?
          </p>
          <button type="submit" className="form-btn">
            Sign in
          </button>
        </form>
        <Link href={"/auth/signup"} className="account-status">
          create an account? <span>Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
