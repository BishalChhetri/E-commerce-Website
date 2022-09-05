import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
  getAlertTitleUtilityClass,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/dist/server/api-utils";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Styles from "../styles/Layout.module.css";
import { Store } from "../utils/Store";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import CheckoutWizard from "../components/CheckoutWizard";

export default function UploadImage() {
  const router = useRouter();
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
