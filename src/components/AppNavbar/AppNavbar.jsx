import React from 'react';
import { withRouter } from 'react-router-dom'
import { Navbar, Button, Form, FormControl, Nav } from 'react-bootstrap';

// + https://react-bootstrap.github.io/components/navbar/
// - https://medium.com/@leonardellifernando/reactjs-navbar-con-bootstrap-y-react-router-85f8ba82edc1

class AppNavbar extends React.Component {

    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Wallakeep</Navbar.Brand> 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
};

export default withRouter(AppNavbar);