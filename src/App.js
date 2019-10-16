import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/reduxStore";


const App = () => {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <div className="app">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
