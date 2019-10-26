import React from "react";
import AppNavbar from '../AppNavbar/AppNavbar';
import { withRouter } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import { getUserLS, isEmpty } from '../../utils/localStorage';
import * as API from '../../services/AdService';
import AdList from './AdList';

class Search extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            ads: [],
            query: '',
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


    recoverContext() {

        //mejorar

        console.log('recoverContext context pre', this.context);


        if (isEmpty(this.context.user))
            this.context.updateUser(this.state.user);

        console.log('recoverContext context post', this.context);
    }


    render() {
        const { ads } = this.state;
        this.recoverContext();

        return (
            <>
                <AppNavbar />

                {
                    ads
                    &&
                    ads.length
                    &&
                    <AdList ads={ads} />
                }
            </>
        );
    }
}

export default withRouter(Search);