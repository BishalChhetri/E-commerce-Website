import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import NextLink from "next/Link";
import Head from "next/head";
import Layout from "../components/Layout";
import data from "../utils/data";
import pool from "../utils/db";
import axios from "axios";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSnackbar } from "notistack";

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(
      (x) => x[0].slug === product[0].slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product[0].slug}`);

    if (data[0].countInStock < quantity) {
      enqueueSnackbar("Sorry,Product is out of stock", { variant: "error" });
      setTimeout(function () {
        closeSnackbar();
      }, 4000);

      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.image}
                      title={product.name}
                      sx={{ padding: "1em 1em 0 1em" }}
                    ></CardMedia>
                    <CardContent>
                      <Typography>
                        <strong>{product.name}</strong>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>
                    <strong>RS {product.price}</strong>
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler([product])}
                  >
                    <strong>Add to Cart</strong>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const query = "SELECT * FROM products";
  const products = await new Promise((resolve, reject) => {
    pool.query(query, function (err, result, fields) {
      if (err) {
        return reject(err);
      }
      // const product = Object.keys(result).forEach(function (key) {
      //   const row = result[key];
      //   return row;
      // });
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      // console.log(results);
      resolve(results);
    });
  });

  return {
    props: { products },
  };
}
