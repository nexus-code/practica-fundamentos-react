import React from 'react';
import { withRouter } from 'react-router-dom'
import { Pagination } from 'react-bootstrap';

// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1

class AppPagination extends React.Component {

   
    render() {

        const pages  = this.props;
        const active = this.props.match.params.page;

        // let active = 2;
        let items = [];
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }        

        return (

            <div className='container text-center'>
                <Pagination>{ items }</Pagination>
                <br />

                <Pagination size="lg">{ items }</Pagination>
                <br />

                <Pagination size="sm">{ items }</Pagination>
            </div>
        )
    }

};

export default withRouter(AppPagination);