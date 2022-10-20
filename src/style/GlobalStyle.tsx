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

button {
  cursor: pointer;
}

input,select{
  outline: none;
}
select{
  border-radius:0; /* 아이폰 사파리 보더 없애기 */
	-webkit-appearance:none; /* 화살표 없애기 for chrome*/
	-moz-appearance:none; /* 화살표 없애기 for firefox*/
	appearance:none; /* 화살표 없애기 공통*/
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: textfield;
  margin: 0;
}


:root {
  --primary: #319CEA;
  --grey:#BDBDBD;
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
