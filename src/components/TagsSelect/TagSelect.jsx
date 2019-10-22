import React from 'react';
import Select from 'react-select';
import * as API from '../../services/Nodepop';

export default class TagSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }

        this.getTagsList();
    }
    
    getTagsList() {
        API.getTagsList().then(tags =>
            this.setState({
                tags
            })
        );
    }

    state = {
        selectedOption: null,
    };
    
    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    
    render() {

        const { selectedOption } = this.state;
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