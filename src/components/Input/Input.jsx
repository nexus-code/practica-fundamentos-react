import React from 'react';
import { UserContext } from '../../context/UserContext'

export default class Input extends React.Component {
    handleOnKeyUp = (e) => {
        const value = e.target.value;

        if (e.keyCode === 13) {
            // this.context.onSubmit(value);
            // this.props.onChange(value);
            this.props.onChange({ target: { name: 'name', value: value } });

        }
    }

    render() {
        return <input type="text" 
                onKeyUp={this.handleOnKeyUp} 
                name={this.props.name} 
                placeholder={this.props.placeholder} 
                />
    }
}

Input.contextType = UserContext;
