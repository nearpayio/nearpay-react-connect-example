import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NearpayProvider from "./context/NearpayContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { NearPay, mount } from "@nearpaydev/nearpay-web-sdk";

const nearpay = new NearPay();

// try to reconnect every 2 seconds after disconnection
nearpay.addAutoReconnect(2000);

// connect to last active user
nearpay.connectToLastUser();

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NearpayProvider nearpay={nearpay}>
        <App />
      </NearpayProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

/**
 *  ui sdk, please uncomment to use it
 * */
// mount(document.getElementById("nearpay-root") as HTMLElement, nearpay);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
