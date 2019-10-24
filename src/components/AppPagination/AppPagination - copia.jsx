import React from 'react';
import { withRouter } from 'react-router-dom'
import { Pagination } from 'react-bootstrap';

// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1
// last input on https://github.com/react-bootstrap/react-bootstrap/issues/3281

class AppPagination extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            pages: parseInt(this.props.pages),
            currentPage: parseInt(this.props.currentPage)
            // pages: this.props.pages,
            // currentPage: this.props.currentPag
        };

        this.pageChanged = this.pageChanged.bind(this);
    }

    gotoFirst(){
        console.log('first!!');
    }

    gotoLast() {
        console.log('last');
    }

    pageChanged(event) {
        console.log(event.target.text);
        console.log(event.target.text + '/' + this.state.currentPage);
        const { pages, currentPage } = this.state;

        let goto = 0;

        switch (event.target.text) {
            case '«First':
                goto = 1;                
                break;
            case '‹Previous':
                goto = currentPage === 1 ? 1 : currentPage - 1;
                break;
            case '›Next':
                goto = currentPage === pages ? pages : currentPage + 1;
                break;
            case '»Last':
                goto = pages;
                break;

            default:
                goto = parseInt(event.target.text);
                break;
        }

        console.log('goto', goto);

        this.setState({ pages: pages, currentPage: goto });

    //    this.props.history.push(`/home?page=${event.target.text}`);
        this.props.history.push(`/home?page=${goto}`);
    }
   
    render() {

        const { pages, currentPage } = this.state;

        if ( pages === 0 ) return(<></>);
         
        
        // const currentPage = parseInt(this.props.currentPage);
        console.log('currentPage:', currentPage);

        let items = [];
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={ number } active={ number === currentPage }  onClick={this.pageChanged}>
                    {number}
                </Pagination.Item>,
            );
        }        

        return (

            <div className='container'>
                <br />
                <Pagination size="lg">
                    <Pagination.First disabled={currentPage === 1} onClick={this.gotoFirst}/>
                    <Pagination.Prev disabled={ currentPage === 1 } />
                    { items }
                    <Pagination.Next disabled={ currentPage === pages } />
                    <Pagination.Last disabled={ currentPage === pages } />
                </Pagination>
                <br />
            </div>
        )
    }

};

export default withRouter(AppPagination);