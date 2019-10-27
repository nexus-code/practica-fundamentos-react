import React from "react";
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext'
import { setUserLS } from '../../utils/localStorage';
import TagSelect from '../TagsSelect/TagSelect'


export default class Register extends React.Component { 
    
    // Define user & save on context & local storage
    
    static contextType = UserContext;

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
        
        const { name, surname } = this.state.user;

        if (name.trim().length <= 3) {
            alert("The name must be bigger than 3 characters");
            return;
        }

        if (surname.trim().length <= 3) {
            alert("The surname must be bigger than 3 characters");
            return;
        }

        setUserLS(this.state.user);
        
        this.context.updateUser(this.state.user);

        this.props.history.push("/home");
    }

    render (){
        
        return (

            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>Wellcome to WallaKeep</h2>
                <Form onSubmit = { this.handleSubmit }>
                    <Form.Group controlId="formGroupname" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Enter name" onChange={ this.handleChange } />
                    </Form.Group>
                    <Form.Group controlId="formGroupsurname" >
                        <Form.Label>Surname</Form.Label>
                        <Form.Control name="surname" placeholder="surname" onChange={ this.handleChange } />
                    </Form.Group>
                    <Form.Group controlId="formGrouptags" >
                        <Form.Label>Tags</Form.Label>
                        <TagSelect onChange={this.handleChange } />
                    </Form.Group>

                    <Button variant="primary  float-right" type="submit">
                        Access
                    </Button>
                </Form>
            </div>
        );
    }
}