"use client";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  DATABASE_ID,
  COLLECTION_ID,
  BUCKET_ID,
  databases,
  storage,
} from "@/app/utils/appwrite";
import Image from "next/image";
import { ID } from "appwrite";
import { postDetails } from "./postDetails";

const DonateItem = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!user) {
      console.log("NO user found");
      // router.push("/auth/login");
    } else {
      console.log({ ...user });
    }
  }, [user, router]);

  const handleDonateDefault = async (e) => {
    e.preventDefault();
    try {
      const file = await storage.createFile(BUCKET_ID, ID.unique(), image);
      const imageUrl = file.$id;

      //generating post details
      const newPostDetails = {
        ...postDetails,
        image_url: imageUrl,
        title: "Science Book",
        description: "New science book for class 10th",
        user_id: user.$id,
        user_name: user.name,
        address_country: "India",
        address_state: "Uttar Pradesh",
        address_pincode: "201301",
        address_locality: "Shaberi",
        contact_mobile_no: "9945751584",
        contact_email: "hi@example.com",
        is_donated: false,
        // upload_time: currentDatetime,
        address_district: "Ghaziabad",
      };

      const post = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newPostDetails
      );

      // router.push("/dashboard"); // Redirect to dashboard after successful post creation
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Generate image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <main className={"container"}>
        <h1 className={clsx(styles.title, "container")}>
          Donate Items <span> [ {user ? user.name : "No User found"} ]</span>{" "}
        </h1>
        <button onClick={handleDonateDefault} className={styles.btn}>
          DEFAULT Donate
        </button>

        <div style={{ textAlign: "center" }}>
          <form onSubmit={handleDonateDefault} style={{ margin: "20px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", margin: "0 auto 20px" }}
            />
            {preview && (
              <div style={{ marginBottom: "20px" }}>
                {/* <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                /> */}
                <Image
                  src={preview}
                  width={300}
                  height={300}
                  // style={{ maxWidth: "100%", height: "auto" }}
                  alt="Preview of pic"
                />
              </div>
            )}
            <button
              type="submit"
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Upload Image
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default DonateItem;
