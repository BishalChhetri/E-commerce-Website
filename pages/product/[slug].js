import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import NextLink from "next/Link";
import Image from "next/image";
import {
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Button,
  Rating,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import Styles from "../../utils/styles";
import { Store } from "../../utils/Store";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import dynamic from "next/dynamic";

const db = require("../../models/db");
const Product = db.products;

function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const { userInfo } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let deleteProduct = 0;
  if (userInfo) {
    deleteProduct = userInfo.isAdmin;
  }

  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x) => x[0].slug === product[0].slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product[0].slug}`);

    if (data[0].countInStock < quantity) {
      enqueueSnackbar("Sorry,Product is out of stock", { variant: "error" });
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };

  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClose = () => {
    setOpen(true);
  };
  const handleCloseNo = () => {
    setOpen(false);
  };
  const handleCloseYes = async (product_id) => {
    setConfirmDelete(true);
    setOpen(false);

    try {
      const { message } = await axios.post("/api/file/productDelete", {
        product_id,
      });
      enqueueSnackbar(`Successfully deleted!`, { variant: "success" });
      router.push("/");
    } catch (e) {
      enqueueSnackbar(e.response.data ? e.response.data.message : e.message, {
        variant: "error",
      });
      console.log(e);
    }
  };

  const deleteHandler = async (id) => {
    setOpen(true);
    console.log(id)
  };

  return (
    <Layout title={product[0].name} desciption={product[0].description}>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this product?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You can't undo this action!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNo}>No</Button>
            <Button
              onClick={() => handleCloseYes(product[0].product_id)}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={Styles.section}></div>
      <div className={Styles.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>
              <strong>Back to Product</strong>
            </Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product[0].image}
            alt={product[0].name}
            width={400}
            height={400}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product[0].name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Category : </strong>
                {product[0].category}{" "}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Brand : </strong>
                {product[0].brand}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Rating : </strong>
                {product[0].rating}stars({product[0].numReviews}reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                {" "}
                <strong>Description : </strong>
                {product[0].description}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Price</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>RS {product[0].price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Status</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product[0].countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListItem>
              {deleteProduct ? (
                <>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="tertary"
                      onClick={() => {
                        deleteHandler(product[0].product_id);
                      }}
                    >
                      Delete this item
                    </Button>
                  </ListItem>
                </>
              ) : (
                ""
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const result = await Product.findOne({ where: { slug: slug } });
  const product = Object.values(JSON.parse(JSON.stringify([result])));

  return {
    props: { product },
  };
}

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false });
