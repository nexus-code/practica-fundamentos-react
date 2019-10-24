import React     from "react";
import AppNavbar from '../AppNavbar/AppNavbar';

// import { UserContext } from '../../context/UserContext'
// import { setUserLS } from '../../utils/localStorage';
import * as API      from '../../services/AdService';
import AdList        from '../AdList/AdList';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ads: []
        }

        this.searchAds();
    }

    searchAds = () => {
        API.searchAds().then(ads => {
            this.setState({
                ads
            })
        });
    }

    search = (e) => {
        const query = e.target.value;

        if (query && query.trim().length) {
            API.searchAds(query).then(ads => this.setState({ ads }))
        } else {
            this.searchAds();
        }
    };

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