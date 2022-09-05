import { createGlobalStyle } from "styled-components";

const useStyles = createGlobalStyle`
  navbar {
    backgroundColor: #570861,
    "& a"{
      // for child
      color: #ffffff,
      marginLeft: 10,
    },
  }`;

export default useStyles;
