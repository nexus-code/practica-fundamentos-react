import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as API from '../../services/AdService';

export default class TagSelect extends React.Component {

/*
    - Get tags from API and list on select
        · Select [options] must contain values with format {value: option, label: option}
    - Return selected value (selectedOption.value) on target object, to be user for parent handlers
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
            { selectedOption }
            //,() => console.log(`TagSelect.selectedOption:`, this.state) 
        );

        // save value on parent
        this.props.onChange({ target: { name: 'tags', value: selectedOption.value } });
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
    // value: PropTypes.string,
    onChange: PropTypes.func.isRequired
}