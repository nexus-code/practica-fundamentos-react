import React           from "react";
import { withRouter }  from "react-router-dom";
import { Button, Spinner } from 'react-bootstrap'
import AppNavbar       from '../AppNavbar/AppNavbar';
import { getAdDetail } from '../../services/AdService';

class AdDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        const AdID = this.props.match.params.id;
        this.goBack = this.goBack.bind(this);

        getAdDetail(AdID).then(ad => {
            
            if (ad.hasOwnProperty('success')) {

                this.props.history.push("/404");
            } else {
                
                this.setState({ ad });
            }
        });
    }

    goBack(){

        this.props.history.goBack();
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

                            <h1 style={{
                                color: ad.type = 'sell' ? 'green' : 'blue'
                                }}>{ ad.name } <span className='badge badge-primary'>{ad.price}€</span>
                            </h1>
                            <p>{ ad.description }</p>
                            <p>
                                {
                                    ad.tags.map(tag => `${tag} | `)
                                }
                            </p>
                            <br />
                            <hr />
                            <br />
                            <Button className='btn btn-dark' onClick= { this.goBack} >Go back</Button>
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