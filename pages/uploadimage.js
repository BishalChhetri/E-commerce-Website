import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

function UploadImage() {
  const imageHandler = async (e) => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      axios
        .post("/api/file/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const { filename } = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <Layout title="uploadimage">
      <div>
        <h1>Product image</h1>
        <form
          method="post"
          action="/api/file/fileupload"
          encType="multipart/form-data"
        >
          <input type="file" id="file" name="file"></input>
          <button type="submit" onClick={imageHandler}>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(UploadImage), { ssr: false });
