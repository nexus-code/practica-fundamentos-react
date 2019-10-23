import React from "react";
import { withRouter } from "react-router-dom";

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
                className='col-4'
                onClick={ this.goToDetail }
            >
                <img src={ ad.photo } alt={ ad.name } />
                <h5
                    style={{
                        color: ad.type = 'sell' ? 'green' : 'blue'
                    }}
                >
                    { ad.name }
                </h5>
                <p>{ ad.description }</p>
                <p>{ ad.price } €</p>                
                <p>{ ad.id } €</p>                
            </div>
        );
    }
}

export default withRouter(Ad);