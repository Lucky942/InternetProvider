import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, Route} from "react-router-dom";
import Tariffs from "./components/Main/Tariffs/Tariffs";
import Services from "./components/Main/Services/Services";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
