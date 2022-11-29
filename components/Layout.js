import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Button,
  Badge,
  cardActionAreaClasses,
  Menu,
  MenuItem,
} from "@mui/material";

import Head from "next/head";
import NextLink from "next/Link";
import styles from "../styles/Layout.module.css";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  let addproduct = 0;
  if (userInfo) {
    addproduct = userInfo.isAdmin;
  }

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#05445E",
      },
      secondary: {
        main: "#008000",
      },
      tertary: {
        main: "#8b0000",
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect && redirect !== "backdropClick") {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title}  E-commerce` : "E-commerce"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={styles.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Typography className={styles.brand}>E-commerce</Typography>
              </Link>
            </NextLink>
            <div className={styles.grow}></div>
            <div>
              <NextLink href="/addproduct" passHref>
                <Link color="#ffffff" style={{ textDecoration: "none" }}>
                  {addproduct ? (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        className={styles.navbarButton}
                        style={{ color: "white" }}
                      >
                        Add Product
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Link>
              </NextLink>
              <NextLink href="/cart" passHref>
                <Link color="#ffffff" style={{ textDecoration: "none" }}>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    style={{ color: "#ffffff", fontWeight: "bold" }}
                    className={styles.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order History
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>LogOut</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link color="#ffffff" style={{ textDecoration: "none" }}>
                    {" "}
                    Login
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container
          className={styles.children}
          style={{
            marginBottom: "2.5rem",
          }}
        >
          {children}
        </Container>

        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
        >
          <footer className={styles.footer}>
            <Typography>
              <strong>All rights reserved. Bishal KC</strong>
            </Typography>
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
