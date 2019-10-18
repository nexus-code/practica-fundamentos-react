import React from "react";
import { UserContext } from '../../context/UserContext'
// import { setUserLS } from '../../utils/localStorage';

export default class Nodepop extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        // this.updateUserFromStorage();
    }

    render() {
        const { user } = this.context;

        return (
            <div>
                {user}
            </div>
        )
    }
}