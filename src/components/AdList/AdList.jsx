import React from 'react';
import { withRouter } from "react-router-dom";
import Ad from '../Ad/Ad'
import AppPagination from '../AppPagination/AppPagination'

class AdList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    // const page = this.props.match.params.page;

    buildMovieList = (ads) => {
        return (
            <>
                {
                    ads.map(ad => <Ad ad={ ad } key={ ad.id } />)
                }
            </>
        )
    };

    render() {
        let { ads } = this.props;

        // console.log('this.props.match.params.page',this.props.match.params.page)

        const itemsPerPage = 3; // !! A config o similar

        const pages = ads.length > itemsPerPage ? Math.floor(ads.length/itemsPerPage) : 0;
        const page = this.props.match.params.page === 'undefined' ? 0 : this.props.match.params.page;
        ads = ads.slice (page, itemsPerPage);

        return (
            <div className='container mt-5 mb-5'>
                <div className='card-columns'>
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
                        <div className='text-center mt-5'>
                            <h2>No advertisements found</h2>
                        </div>
                    }
                </div>
                <div>
                    <AppPagination page={ page } pages={ pages } /> 
                </div>
            </div>
        );
    }
}

export default withRouter(AdList);