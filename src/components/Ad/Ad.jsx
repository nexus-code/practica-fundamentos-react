import React from "react";
import { withRouter } from "react-router-dom";

// https://getbootstrap.com/docs/4.0/components/card/
class Ad extends React.Component {
    
    goToDetail = () => {


        this.props.history.push(`/detail/${this.props.ad.id}`);
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
                        <p className='card-text'>{ ad.price } €</p>                
                    </div>
                </div>
        );
    }
}

export default withRouter(Ad);