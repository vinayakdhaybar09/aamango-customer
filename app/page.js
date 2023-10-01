"use client"
import Image from "next/image";
// import { Inter } from 'next/font/google'
import styles from "./page.module.css";
import heroImg from "../public/images/heroImg.png";
import one from "../public/images/1.png";
import two from "../public/images/2.png";
import three from "../public/images/3.png";
import four from "../public/images/4.png";
import five from "../public/images/5.png";
import six from "../public/images/6.png";

import whoImg from "../public/images/whoImg.jpeg";
import whoImg2 from "../public/images/whoImg2.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "@/redux/userSlice";

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(checkLogin())
  }, [])
  

  return (
    <main className={styles.homePage}>
      <div className={styles.heroSection}>
        <div className={styles.heroData}>
          <h1>Handpicked Mangoes Specially for Your Family.</h1>
          <p>
            Juicy, Fresh, and Convenient: Mangoes Delivered Right to Your
            Doorstep!
          </p>
          <Link href={"/products"} className={styles.productBtn}>
            Order Now
          </Link>
        </div>
        <div>
          <Image src={heroImg} alt="Mango img" className={styles.heroImg} />
        </div>
      </div>

      <div className={styles.infoBgSection}>
        <p>
          Kokan is well-known for growing some of the worldsbest mangos. We
          harvest the most prime mangos we can find each day.
        </p>
      </div>

      <div className={styles.whySection}>
        <h3 className={styles.whySectionTitle}>Why aamango ?</h3>
        <div className={styles.whyContainer}>
          <div className={styles.whyImgBox}>
            <Image src={one} alt="one" className={styles.whyImg} />
            <p>Varieties of Mangoes</p>
          </div>
          <div className={styles.whyImgBox}>
            <Image src={two} alt="one" className={styles.whyImg} />
            <p>Directly From Farmers</p>
          </div>
          <div className={styles.whyImgBox}>
            <Image src={three} alt="one" className={styles.whyImg} />
            <p>100% Organic Mangoes</p>
          </div>
          {/* </div> */}
          {/* <div className={styles.whyContainer}> */}
          <div className={styles.whyImgBox}>
            <Image src={four} alt="four" className={styles.whyImg} />
            <p>Chemical & Carbide Free</p>
          </div>
          <div className={styles.whyImgBox}>
            <Image src={five} alt="one" className={styles.whyImg} />
            <p>Delicious & Pulpy </p>
          </div>
          <div className={styles.whyImgBox}>
            <Image src={six} alt="one" className={styles.whyImg} />
            <p>All Over India Delivery </p>
          </div>
        </div>
      </div>

      <div className={styles.whoSection}>
        <h3 className={styles.whoSectionTitle}>Who are we ?</h3>
        <div className={styles.whoInfo}>
          <p className={styles.whoInfoData}>
            Mango is regarded as the king of fruits and is one of the most
            widely produced fruits in India. Aamango is your route to the
            goodness of Indian mangoes. It doesn't matter which variety of mango
            you prefer because aamango has them all in one location. We are a
            company that focusing on providing you with all varieties of real
            Indian mangoes that are residue-free. Choose the variety of mango
            you are craving and buy it right away if you are in the mood for a
            juicy one.
          </p>
          <div className={styles.whoImageBox}>
            <Image
              src={whoImg}
              alt="Mango in basket"
              className={styles.whoImage}
            />
            <Image src={whoImg2} alt="Mangoes" className={styles.whoImageTwo} />
          </div>
        </div>
      </div>
    </main>
  );
}
