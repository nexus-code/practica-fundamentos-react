import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { getAdDetail } from '../../services/AdService';

class AdDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        const AdID = this.props.match.params.id;

        getAdDetail(AdID).then(ad => {
            
            if (ad.hasOwnProperty('success')) {

                this.props.history.push("/404");
            } else {
                
                this.setState({ ad });
            }

        });
    }

    render() {
        const { ad } = this.state;

        return (
            <div className="container">
                {
                    ad
                    &&
                    <div>
                        <img src={ad.photo} alt={ad.name} />

                        <h1>{ ad.name }</h1>
                        <p>{ ad.description }</p>
                    </div>
                }

                {
                    !ad
                    &&
                    <h1>Loading...</h1>
                }
            </div>
        );
    }
}

export default withRouter(AdDetail);