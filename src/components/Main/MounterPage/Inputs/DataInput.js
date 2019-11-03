import React from 'react';

class DataInput extends React.Component {

    constructor(props){
        super(props);
        this.input = React.createRef();
    }

    handleClick = async () => {
        await this.props.getInfo(this.input.current.value);
        this.props.setInputName(this.props.inputName);
        this.input.current.value = "";
    };

    render() {
        return (
            <React.Fragment>
                <input type="text" ref = {this.input}/>
                <button onClick={this.handleClick}>Показать информацию</button>
            </React.Fragment>
        );
    }

}

export default DataInput;