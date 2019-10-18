import React from "react";
import { Form, Button } from 'react-bootstrap';
import { UserConsumer } from '../../context/UserContext'
import { setUserLS } from '../../utils/localStorage';

export default class Register extends React.Component { 
    
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                surname: '',
                tags: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const { name, value } = event.target;

        this.setState(({ user }) => ({
            user: {
                ...user,
                [name]: value
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.user.name.trim().length <= 3) {
            alert("The name must be bigger than 3 characters");
            return;
        }

        if (this.state.user.surname.trim().length <= 3) {
            alert("The surname must be bigger than 3 characters");
            return;
        }

        // Tags pending

        setUserLS(this.state.user);
        return true;
    }


    render (){
        
        return (
            <UserConsumer>
                {({ user, updateUser }) => (

                    <div
                        className="well"
                        style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}
                    >
                        <h2>Wellcome to WallaKeep</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formGroupname" onChange={this.handleChange} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" placeholder="Enter name" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupsurname" onChange={this.handleChange} >
                                <Form.Label>Surname</Form.Label>
                                <Form.Control name="surname" placeholder="surname" required />
                            </Form.Group>
                            <Form.Group controlId="formGrouptags" onChange={this.handleChange} >
                                <Form.Label>Tags</Form.Label>
                                <Form.Control name="tags" placeholder="tags" required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Access
                            </Button>
                        </Form>
                    </div>
                )}
            </UserConsumer>
        );
    }
}