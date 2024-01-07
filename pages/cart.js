import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { Store } from "../utils/Store";
import {
  Grid,
  Link,
  MenuItem,
  Select,
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
} from "@mui/material";
import NextLink from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item[0].slug}`);
    if (data[0].countInStock < quantity) {
      enqueueSnackbar("Sorry,Product is out of stock", { variant: "error" });
      setTimeout(function () {
        closeSnackbar();
      }, 4000);
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: quantity },
    });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkOutHandler = () => {
    router.push("./shipping");
  };

  return (
    <Layout title="shopping Cart">
      <Typography component="h1" variant="h1">
        <strong>Shopping Cart</strong>
      </Typography>
      {cartItems.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          Cart is empty.{" "}
          <NextLink href={`/`} passHref>
            <Link>Go Shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {" "}
                      <strong>Image</strong>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <strong>Price</strong>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item[0].slug}>
                      <TableCell>
                        <NextLink href={`/product/${item[0].slug}`} passHref>
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
                        <NextLink href={`/product/${item[0].slug}`} passHref>
                          <Link>
                            <Typography>{item[0].name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item[0].countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align="right" l>
                        Rs {item[0].price}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    {" "}
                    <strong>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items): Rs
                      {cartItems.reduce(
                        (a, c) => a + c.quantity * c[0].price,
                        0
                      )}
                    </strong>
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={checkOutHandler}
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    <strong>Check Out</strong>
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
