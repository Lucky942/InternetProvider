import React from "react";

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.year = React.createRef();
    this.month = React.createRef();
    this.inputType = this.props.inputType;
  }

  handleClick = async () => {
    await this.props.getInfo(this.year.current.value, this.month.current.value);
    this.props.setInputName(this.props.inputName);
    this.year.current.value = "";
    this.month.current.value = "";
  };

  render() {
    return (
      <React.Fragment>
          <div>Год:
              <input type="text" ref={this.year}/></div>
        {this.inputType === "monthAndYear" && (
          <div>
            Месяц:
            <input type="text" ref={this.month} />
          </div>
        )}
        <button onClick={this.handleClick}>Показать информацию</button>
      </React.Fragment>
    );
  }
}

export default DataInput;
