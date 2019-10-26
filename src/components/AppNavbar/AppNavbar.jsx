import React from 'react';
import PropTypes from 'prop-types';
import { withRouter }  from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
// import { isEmpty, getUserLS } from '../../utils/localStorage';
import { Navbar, Button, Form, FormControl, Nav } from 'react-bootstrap';

// Implement App requirement:
// - Si un usuario se ha registrado, accede, por ejemplo, al listado de anuncios y recarga la página el sistema deberá obtener el usuario del LocalStorage y
// almacenarlo en el contexto para así no perder al usuario de la aplicación.Este comportamiento debe ser el mismo en el detalle de un anuncio o en el crear /  actualizar un anuncio.


// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1

class AppNavbar extends React.Component {

    static contextType = UserContext;

    //////////////////////////////
    // search = (e) => {
    //     // close down search
    //     const query = e.target.value;

    //     if (query && query.trim().length) {
    //         API.searchAds(query).then(ads => this.setState({ ads }))
    //     } else {
    //         this.searchAds();
    //     }
    // };
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    
    render() {

        // console.log('context: ', this.context);

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Wallakeep</Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/profile">My profile</Nav.Link>
                        <Nav.Link href="/advert/create">New advert</Nav.Link>
                    </Nav>
                    <Form inline style={{}}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
};

AppNavbar.propTypes = {
    // value: PropTypes.string,
    displaySearch: PropTypes.bool
}

export default withRouter(AppNavbar);