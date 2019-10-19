import React from "react";
import { UserContext } from '../../context/UserContext'
// import { setUserLS } from '../../utils/localStorage';

export default class Nodepop extends React.Component {

    static contextType = UserContext;

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        console.log('Nodepop Props', this.props);
    }

    render() {
        const { user } = this.context;
        console.log('context', this.context);

        return (
            <div>
                <h2>Hi {user.name}!</h2>
            </div>
        )
    }
}