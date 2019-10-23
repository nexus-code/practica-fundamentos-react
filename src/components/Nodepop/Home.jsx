import React from "react";
import { UserContext } from '../../context/UserContext'
// import { setUserLS } from '../../utils/localStorage';
import * as API from '../../services/NodepopService';
import AdList from '../AdList/AdList';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ads: []
        }

        this.getAdList();
    }

    getAdList = () => {
        API.getAdList().then(ads => {
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
            this.getAdList();
        }
    };

    render() {
        const { ads } = this.state;

        return (
            <>
                <input className="form-control" type="text" onKeyUp={this.search} />

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