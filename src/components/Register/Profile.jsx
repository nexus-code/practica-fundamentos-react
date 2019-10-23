import React from "react";
import { Form, Button } from 'react-bootstrap';
import { setUserLS }    from '../../utils/localStorage';
import { UserContext }  from '../../context/UserContext'
import AppNavbar        from '../AppNavbar/AppNavbar';


export default class Profile extends React.Component { 

    /* 
    Generate user data & save on local storage, if not exits
    */


    constructor(props) {
        super(props);

        console.log('init Register props', props);

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

        console.log('this.context onSubmit', this.context);
        console.log('this.state onSubmit', this.state);


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

        this.context.updateUser(this.state.user);
        this.props.history.push("/home");
    }

    render (){
        
        const {name, surname, tags} = this.context.user;

        return (
            <>
                <AppNavbar />

                <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                    <h2>Wellcome to WallaKeep</h2>
                    <Form onSubmit = { this.handleSubmit }>
                        <Form.Group controlId="formGroupname" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" placeholder="Enter name" value={ name } onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupsurname" >
                            <Form.Label>Surname</Form.Label>
                            <Form.Control name="surname" placeholder="surname" value={ surname } onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGrouptags" >
                            <Form.Label>Tags</Form.Label>
                            <Form.Control name="tags" placeholder="tags" value={ tags } onChange={ this.handleChange } />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Access
                        </Button>
                    </Form>
                </div>
            </>
        );
    }
}

Profile.contextType = UserContext;