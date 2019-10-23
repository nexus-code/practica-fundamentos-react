import React from 'react';
import { withRouter } from 'react-router-dom'
import { Pagination } from 'react-bootstrap';

// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1

class AppPagination extends React.Component {

   
    render() {

        // const page   = this.props.page;
        const pages  = this.props.pages;

        if ( pages === 0 ) return(<></>);
         
        
        
        const currentPage = this.props.currentpage;
        console.log('currentPage', currentPage);
        console.log('pages', pages);

        let items = [];
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={ number === currentPage }>
                    {number}
                </Pagination.Item>,
            );
        }        

        return (

            <div className='container'>
                <br />
                 <Pagination size="lg">
                    <Pagination.First disabled={ currentPage === 1 } />
                    <Pagination.Prev disabled={ currentPage === 1 }/>
                    { items }
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
                <br />
            </div>
        )
    }

};

export default withRouter(AppPagination);