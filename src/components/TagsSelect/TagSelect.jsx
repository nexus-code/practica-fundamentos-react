import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'blues', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra', label: 'Orchestra' }
];

export default class TagSelect extends React.Component {
    render() {
        return (
            <Select options={options} />
        );
    }
}