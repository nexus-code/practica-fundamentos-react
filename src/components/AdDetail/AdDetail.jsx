import React           from "react";
import { withRouter }  from "react-router-dom";
import { Button, Spinner } from 'react-bootstrap'
import { getAdDetail } from '../../services/AdService';

import { UserContext } from '../../context/UserContext'
import { getUserLS, isEmpty } from '../../utils/localStorage';

import AppNavbar       from '../AppNavbar/AppNavbar';

class AdDetail extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            AdID: this.props.match.params.id
        };

        this.goBack = this.goBack.bind(this);
        this.editAdvert = this.editAdvert.bind(this);

        getAdDetail(this.state.AdID).then(ad => {
            
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

    editAdvert() {

        this.props.history.push(`../advert/edit/${this.state.AdID}`);
    }

    componentDidMount() {

        this.recoverContext();
    }

    recoverContext() {
        //Recover context from localStorage (recovered on this.state.user)

        if (isEmpty(this.context.user))
            this.context.updateUser(getUserLS());
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
                                    ad.tags.map(tag => <span className='badge badge-secondary p-2 mr-2' key={tag}> { tag } </span> )
                                }
                            </p>

                            {

                            }
                            <br />
                            <hr />
                            <br />
                            <Button className='btn btn-warning' onClick={this.editAdvert} style={{ float:'right'}} >Edit</Button> 
                            <Button className='btn btn-dark' onClick={ this.goBack } >Go back</Button>
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