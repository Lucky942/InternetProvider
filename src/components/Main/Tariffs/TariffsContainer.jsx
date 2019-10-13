import React, { Component } from "react";
import styles from "./Tariffs.module.css";
import * as axios from "axios";
import Tariffs from "./Tariffs";
import {connect} from "react-redux";

class TariffsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tariffs: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/tariffs")
      .then(response => {
        this.setState({ tariffs: response.data.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return <Tariffs tariffs={this.state.tariffs} />;
  }
}

/*let mapStateToProps = () => {

}

const TariffsContainer = connect(mapStateToProps, mapDispatchToProps)(Tariffs);*/
export default TariffsContainer;
