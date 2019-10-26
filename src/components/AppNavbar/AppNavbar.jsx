import React from 'react';
import PropTypes from 'prop-types';
import { withRouter }  from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { getUserLS, isEmpty } from '../../utils/localStorage';


// Implement App requirement:
// - Si un usuario se ha registrado, accede, por ejemplo, al listado de anuncios y recarga la página el sistema deberá obtener el usuario del LocalStorage y
// almacenarlo en el contexto para así no perder al usuario de la aplicación.Este comportamiento debe ser el mismo en el detalle de un anuncio o en el crear /  actualizar un anuncio.


// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1

class AppNavbar extends React.Component {
   
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {

        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Wallakeep</Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/profile">My profile</Nav.Link>
                        <Nav.Link href="/advert/">Search</Nav.Link>
                        <Nav.Link href="/advert/create">New advert</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
};

AppNavbar.propTypes = {
    displaySearch: PropTypes.bool
}

export default withRouter(AppNavbar);