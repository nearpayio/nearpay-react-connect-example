import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ConnectForm from "./components/ConnectForm";
import PayForm from "./components/PayForm";
import Recipts from "./components/Recipts";
import Reconsiliations from "./components/Reconsiliations";

function App() {
  return (
    <>
      <ConnectForm />
      <hr />
      <PayForm />
      <hr />
      <section className="grid-2">
        <Recipts />
        <Reconsiliations />
      </section>
    </>
  );
}

export default App;
