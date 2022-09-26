import { Button, List, ListItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import react from "react";
import Layout from "../components/Layout";
import Styles from "../styles/Layout.module.css";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import dynamic from "next/dynamic";

function AddProduct() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  let imageExt = "/images/default.png";

  const submitHandler = async ({
    name,
    slug,
    category,
    price,
    brand,
    rating,
    numReviews,
    countInStock,
    description,
  }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/file/productUpload", {
        name,
        slug,
        category,
        image: imageExt,
        price,
        brand,
        rating,
        numReviews,
        countInStock,
        description,
      });

      router.push("/");
    } catch (e) {
      enqueueSnackbar(e.response.data ? e.response.data.message : e.message, {
        variant: "error",
      });
    }
  };

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
          imageExt = filename;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <Layout title="addproduct">
      <div className={Styles.uploadimage}>
        <Typography component="h1" variant="h1">
          Add Product
        </Typography>
        <h5>Upload Image</h5>
        <form
          method="post"
          action="/api/file/fileupload"
          encType="multipart/form-data"
        >
          <input type="file" id="file" name="file"></input>
          <button type="submit" onClick={imageHandler}>
            Upload
          </button>
        </form>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className={Styles.form}>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Name length Should be more than 2"
                        : "Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="slug"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="slug"
                  label="Slug"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.slug)}
                  helperText={
                    errors.slug
                      ? errors.slug.type === "minLength"
                        ? "Slug length Should be more than 4"
                        : "Slug is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 4,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="category"
                  label="Category"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.category)}
                  helperText={
                    errors.category
                      ? errors.category.type === "minLength"
                        ? "Category Should be more than 3"
                        : "Category is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="price"
                  label="Price"
                  inputProps={{ inputProps: { min: 0 } }}
                  error={Boolean(errors.price)}
                  helperText={
                    errors.price
                      ? errors.price.type === "minLength"
                        ? "Only two digits price are allowed."
                        : "Price is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="brand"
                  label="Brand"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.brand)}
                  helperText={
                    errors.brand
                      ? errors.brand.type === "minLength"
                        ? "Brand length Should be more than 2"
                        : "Brand is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="rating"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="rating"
                  label="Rating"
                  inputProps={{ inputProps: { min: 0, max: 10 } }}
                  error={Boolean(errors.rating)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="numReviews"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="numReviews"
                  label="NumReview"
                  inputProps={{ inputProps: { min: 0 } }}
                  error={Boolean(errors.numReviews)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="countInStock"
              control={control}
              defaultValue="0"
              rules={{
                minLength: 0,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="countInStock"
                  label="Count in Stock"
                  inputProps={{ inputProps: { min: 0 } }}
                  error={Boolean(errors.countInStock)}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="description"
                  label="Description"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.description)}
                  helperText={
                    errors.description
                      ? errors.description.type === "minLength"
                        ? "Description length Should be more than 4"
                        : "Description is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AddProduct), { ssr: false });
