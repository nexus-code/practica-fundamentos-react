import React from 'react';
import Ad from '../Ad/Ad'

export default class AdList extends React.Component {

    buildMovieList = (ads) => {
        return (
            <div className="row">
                {
                    ads.map(ad => <Ad ad={ ad } key={ ad.id } />)
                }
            </div>
        )
    };

    render() {
        const { ads } = this.props;
        
        return (
            <div className="mt-3">
                {
                    ads
                    &&
                    ads.length
                    &&
                    this.buildMovieList(ads)
                }

                {
                    !ads
                    &&
                    <div className="text-center mt-5">
                        <h2>No advertisements found</h2>
                    </div>
                }
            </div>
        );
    }
}