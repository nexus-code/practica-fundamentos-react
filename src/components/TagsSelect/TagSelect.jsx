import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as API from '../../services/AdService';

export default class TagSelect extends React.Component {

/*
    No funciona enviar el valor del select a register:  https://stackblitz.com/edit/092019-react-class-event-parent-child?file=index.js
    https://medium.com/@kyledavelaar/updating-parent-component-state-from-children-components-in-react-2ead9b9cec9f
    https://ourcodeworld.com/articles/read/409/how-to-update-parent-state-from-child-component-in-react

    https://react-select.com/home || - https://blog.logrocket.com/getting-started-with-react-select/
*/

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selectedOption: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.getTagsList();
    }
    
    getTagsList() {
        API.getTagsList().then(tags =>
            this.setState({
                tags
            })
        );
    }

    handleChange = selectedOption => {

        this.setState(
            { selectedOption },
            () => console.log(`TagSelect.selectedOption:`, this.state) 
        );

        this.props.onChange(selectedOption.value);  // save value on parent
    };

    
    render() {

        const { selectedOption } = this.state;  // {value, label}
        const options = this.state.tags.map(tag => { let t = {}; t['value'] = tag; t['label'] = tag; return t });

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

TagSelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}