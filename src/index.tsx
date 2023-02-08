import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Router from "./Router";
import client from "./common/client";
import "./styles/global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </RecoilRoot>
);
