import React from 'react';
import Select from 'react-select';
import * as API from '../../services/Nodepop';

export default class TagSelect extends React.Component {

/*
    No funciona enviar el valor del select a register:  https://stackblitz.com/edit/092019-react-class-event-parent-child?file=index.js
    https://medium.com/@kyledavelaar/updating-parent-component-state-from-children-components-in-react-2ead9b9cec9f

    Git tiene actualizado hasta los cambios para comunicar hijo->padre
*/

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            selectedOption: ''
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
            //() => this.props.selectTag(this.state.selectedOption)
        )
    };


    handleSelectChange(event) {
        this.props.handleSelectChange(event.target.value);
        console.log(`Option selected 2:`, event.target.value);
        this.setState({
            value: event.target.value
        });
    }
    
    render() {

        const { selectedOption } = this.state;
        const options = this.state.tags.map(tag => { let t = {}; t['value'] = tag; t['label'] = tag; return t });

        return (
            <Select
                value={selectedOption}
                onChange={this.handleSelectChange}
                options={options}
            />
        );
    }
}