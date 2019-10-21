import React from "react";
import { UserContext } from '../../context/UserContext'
// import { setUserLS } from '../../utils/localStorage';

import { Button } from 'react-bootstrap';


export default class Nodepop extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.handleClickProfileButton = this.handleClickProfileButton.bind(this);
    }

    componentDidMount() {
        console.log('Nodepop Props', this.props);
    }

    handleClickProfileButton(event){
        this.props.history.push('/profile');
    }

    render() {
        const { user } = this.context;
        console.log('context', this.context);

        return (
            <div>
                <h2>Hi {user.name}!</h2>
                <br/>
                <Button variant="primary" onClick={this.handleClickProfileButton}>
                    Profile
                </Button>
            </div>
        )
    }
}