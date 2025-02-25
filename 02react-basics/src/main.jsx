import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

function MyApp() {
  return <h1>Custom App</h1>;
}
// const Element = {
//   type: "a",
//   props: {
//     href: "https://google.com",
//     target: "_blank",
//   },
//   children: "Click me to visit google",
// };

const user = "Himanshu";

const reactElement = React.createElement(
  "a",
  { href: "https://google.com", target: "_blank" },
  "visit google",
  user
);
const anotherElement = (
  <a href="https://google.com" target="_blank">
    Visit Google
  </a>
);
createRoot(document.getElementById("root")).render(
  // MyApp()
  // <MyApp/>
  // anotherElement
  reactElement
  // <App/>
);
