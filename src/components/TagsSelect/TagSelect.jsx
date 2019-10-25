import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as API from '../../services/AdService';

export default class TagSelect extends React.Component {

/*
    - Get tags from API and list on select
        · Select [options] must contain values with format {value: option, label: option}
    - Return selected value (selectedOption.value) on target object, to be user for parent handlers
    - isMulti is false by default, no mandatory to indicate (no in prop types)
    - value contains values by default, as string or array
*/

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
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

        // save value on parent
        this.props.onChange({ target: { name: 'tags', value: selectedOption.value } });
    };

    
    render() {

        const isMulti = false || this.props.isMulti;
        const options = this.state.tags.map(tag => { let t = {}; t['value'] = tag; t['label'] = tag; return t });
        const selectedValues = this.props.value && this.props.value.map(tag => { let t = {}; t['value'] = tag; t['label'] = tag; return t });

        return (
            <>
                {
                    isMulti
                    &&
                    <Select
                        onChange={this.handleChange}
                        options={options}
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedValues}
                    />
                }

                {
                    !isMulti
                    &&
                    <Select
                        value={selectedValues}
                        onChange={this.handleChange}
                        options={options}
                    />
                }
            </>
        );
    }
}

TagSelect.propTypes = {
    onChange: PropTypes.func.isRequired
}