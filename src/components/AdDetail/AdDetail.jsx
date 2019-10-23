import React           from "react";
import { withRouter }  from "react-router-dom";
import Spinner         from 'react-bootstrap/Spinner'
import AppNavbar       from '../AppNavbar/AppNavbar';
import { getAdDetail } from '../../services/AdService';

class AdDetail extends React.Component {
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
            <>
                <AppNavbar />
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
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                </div>
            </>
        );
    }
}

export default withRouter(AdDetail);