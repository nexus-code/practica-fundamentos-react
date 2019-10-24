import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Ad from '../Ad/Ad'
import AppPagination from '../AppPagination/AppPagination'

class AdList extends React.Component {

    buildMovieList = (ads) => {
        return (
            <>
                {
                    ads.map(ad => <Ad ad={ ad } key={ ad.id } />)
                }
            </>
        )
    };

    
    getCurrentPage(length, step) {
    // return current page from url. 1 by default
        
        const urlSearch = this.props.history.location.search;
        let currentPage = 1;
        
        if (urlSearch.length > 0 && urlSearch.indexOf('page') > 0)
            currentPage = urlSearch.substring(urlSearch.indexOf('page=') + 'page='.length, urlSearch.length);
        

        // return (urlSearch.length > 0 && urlSearch.indexOf('page') > 0) ? parseInt(urlSearch.substring(urlSearch.indexOf('page') + 'page'.length, urlSearch.length)) : 1
        return parseInt(currentPage);
    }

    componentDidMount(){
        // pending: 

        // if (currentPage > pages){
        //     this.props.history.push(`/home?page=${pages}`);
        // }        
    }

    render() {
        let { ads } = this.props;
        const itemsPerPage = 3; // !! pending: to config or register !!
            
        // pagination
        const pages = Math.ceil(ads.length / itemsPerPage);
        const currentPage = this.getCurrentPage(ads.length);


        const startIndex = (currentPage - 1) * itemsPerPage;    // first index on [ads] to show in this page

        ads = ads.slice(startIndex, startIndex + itemsPerPage); // Optimize on API call
        
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
                    <br/>
                    <hr/>
                    <br/>
                    <AppPagination currentPage={ currentPage } pages={ pages } /> 
                </div>
            </div>
        );
    }
}

AdList.propTypes = {
    ads: PropTypes.array.isRequired
}

export default withRouter(AdList);