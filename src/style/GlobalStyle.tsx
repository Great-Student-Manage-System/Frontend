import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 html,
body {
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%; /* 1rem=10px */
}

body {
  font-size: 1.6rem; /* 16px */
}

* {
  font-family: "Spoqa Han Sans Neo", sans-serif;
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  image-rendering: -webkit-optimize-contrast;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}


:root {
  --primary: #319CEA;
  --content-width: 1024px;
  --content-margin: 2rem;
  --auth-content-width: 376px;
}
/* 
// 1024px
@media (min-width: 768px) {
  .mobile {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .desktop {
    display: none !important;
  }
} */

`;

export default GlobalStyle;
