import React, {Component} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";


class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if(!this.props.initialized) return "Loading";

        return (

                    <div className="app">
                        <Header/>
                        <Main/>
                        {/*<Footer/>*/}
                    </div>
        );
    }
}


let mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default connect(mapStateToProps, {initializeApp})(App);
