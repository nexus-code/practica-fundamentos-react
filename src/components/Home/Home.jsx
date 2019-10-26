import React     from "react";
import AppNavbar from '../AppNavbar/AppNavbar';

import { UserContext } from '../../context/UserContext'
import { getUserLS, isEmpty } from '../../utils/localStorage';
import * as API      from '../../services/AdService';
import AdList        from '../AdList/AdList';

export default class Home extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        
        // const user = getUserLS();
        // if (isEmpty(user)) {
            
        //     this.gotoRegisterWithoutUser();
        //     return
        // }

        this.state = {
            ads: [],
            user: getUserLS()
        }

        this.searchAds();
    }

    searchAds = () => {

        //Register tag is used to default search

        API.searchAds(`tag=${this.state.user.tags}`).then(ads => {
            this.setState({
                ads
            })
        });
    }

    componentDidMount() {

        this.recoverContext();
    }

    gotoRegisterWithoutUser() {

        this.props.history.push("/register");
    }

    recoverContext() {
        //Recover context from localStorage (recovered on this.state.user)

        if (isEmpty(this.context.user))
            this.context.updateUser(this.state.user);
    }


    render() {
        const { ads } = this.state;

        return (           
            <>
                <AppNavbar />

                {
                    ads
                    &&
                    ads.length
                    &&
                    <AdList ads={ ads } />
                }
            </>
        );
    }
}