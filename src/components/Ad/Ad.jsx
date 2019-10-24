import React from "react";
import { withRouter } from "react-router-dom";

// https://getbootstrap.com/docs/4.0/components/card/
class Ad extends React.Component {
    
    goToDetail = () => {

        this.props.history.push(`/advert/${this.props.ad.id}`);
    };

    render() {
        const { ad } = this.props;
        
        return (
            
                <div
                    style={{
                        cursor: 'pointer'
                    }}
                    key={ ad.id }
                    className='card'
                    onClick={ this.goToDetail }
                >
                    <div className='card-header'>{ad.type}</div>
                    <img className='card-img-top text-center'  src={ ad.photo } alt={ ad.name } />
                    <div className='card-body'>
                        <h5 className='card-title'
                            style={{
                                color: ad.type = 'sell' ? 'green' : 'blue'
                            }}
                        >
                            { ad.name }
                        </h5>
                        <p className='card-text'>{ ad.description }</p>
                        <h2 className='text-center'><span className='badge badge-primary'>{ ad.price } €</span></h2>                
                    </div>
                </div>
        );
    }
}

export default withRouter(Ad);