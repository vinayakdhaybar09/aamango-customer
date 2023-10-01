"use client";
import React, { useState } from "react";
import "../signin/signin.css";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { firestoreAddData } from "@/services/operations";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createUser } from "@/redux/userSlice";
// import { notifications } from "@mantine/notifications";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        if (user?.uid != null) {
          await firestoreAddData("users", res?.user?.uid, {
            userid: res?.user?.uid,
            name: res?.user?.displayName,
            email: res?.user?.email,
            contactNo: res?.user?.phoneNumber,
            address: null,
            orderHistory: null,
          }).then(()=>{
            toast.success("Your account is successfully created...!")
            router.push("/auth/signin")
          }).catch((err)=>{
            toast.error(err.message)
          })
        }
        
      } else {
        toast.info("You are alredy Login")
      }
    } catch (err) {
       toast.error(err.message);
    }
    
      // .then((res) => {
      //   console.log(res?.user);
      // })
      // .then(() => {
      //   console.log("data added to firstore");
      //   toast.success("Account created successfully");
      //   router.push("/auth/signin");
      // })
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res?.user);
      if (res?.user?.uid != null) {
        dispatch(
          createUser("users", res?.user?.uid, {
            userid: res?.user?.uid,
            name: res?.user?.displayName,
            email: res?.user?.email,
            contactNo: res?.user?.phoneNumber,
            address: null,
            orderHistory: null,
          })
        );
        // firestoreAddData("users", res?.user?.uid, {
        //   userid: res?.user?.uid,
        //   name: res?.user?.displayName,
        //   email: res?.user?.email,
        //   contactNo: res?.user?.phoneNumber,
        //   address: null,
        //   orderHistory: null,
        // });
      }
      console.log("data added to firstore");
      // router.push("/auth/signin");
      localStorage.setItem("login", true);
      toast.success("login");
      // console.log(result.user);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="signin-section">
      <div className="sigin-box">
        <h1 className="signin-title">Create.</h1>
        <div className="signin-google-box" onClick={handleGoogleSignin}>
          <FcGoogle className="google-icon" />
          <p className="google-signin-btn">Sign up with Google</p>
        </div>
        <p className="signin-divider">Or, sign up with your email</p>
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
          {/* <p className="forget-field">Forgot Password?</p> */}
          <button type="submit" className="form-btn">
            Create account
          </button>
        </form>
        <Link href={"/auth/signin"} className="account-status">
          Already have an account? <span>Signin</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
