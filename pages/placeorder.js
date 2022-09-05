import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Store } from "../utils/Store";
import {
  Grid,
  Link,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Table,
  TableHead,
  Card,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import NextLink from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/layout.module.css";
import CheckoutWizard from "../components/CheckoutWizard";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import Cookies from "js-cookie";

function PlaceOrder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
    shippingAddress,
    paymentMethod,
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c[0].price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 1000 ? 150 : 100;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
      setLoading(false);
      router.push(`/order/${data.order_id}`);
    } catch (e) {
      setLoading(false);
      enqueueSnackbar(getError(e), { variant: "error" });
    }
  };

  return (
    <Layout title="shopping Cart">
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={styles.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName},{shippingAddress.address},{" "}
                {shippingAddress.city},{shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={styles.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={styles.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item[0].slug}>
                          <TableCell>
                            <NextLink
                              href={`/product/${item[0].slug}`}
                              passHref
                            >
                              <Link>
                                <Image
                                  src={item[0].image}
                                  alt={item[0].name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink
                              href={`/product/${item[0].slug}`}
                              passHref
                            >
                              <Link>
                                <Typography>{item[0].name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>Rs {item[0].price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={styles.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}></Grid>
                  <Typography>Items:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">Rs {itemsPrice}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}></Grid>
                  <Typography>Tax:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">Rs {taxPrice}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}></Grid>
                  <Typography>Shipping:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">Rs {shippingPrice}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}></Grid>
                  <Typography>
                    <strong>Total:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">
                    <strong>Rs {totalPrice}</strong>
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
