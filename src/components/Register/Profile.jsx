import React from "react";
import { Form, Button } from 'react-bootstrap';
import { UserContext }  from '../../context/UserContext'
import { setUserLS, getUserLS, isEmpty }    from '../../utils/localStorage';
import AppNavbar        from '../AppNavbar/AppNavbar';
import TagSelect        from '../TagsSelect/TagSelect'


export default class Profile extends React.Component { 

    /* Manage user data */
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

        const user = getUserLS();
        if (isEmpty(user)) {

            this.gotoRegisterWithoutUser();
        } else {

            this.state = {
                user: getUserLS()
            }
        }        

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

    gotoRegisterWithoutUser() {

        this.props.history.push("/register");
    }

    recoverContext() {
        //Recover context from localStorage (recovered on this.state.user)

        if (isEmpty(this.context.user))
            this.context.updateUser(this.state.user);
    }

    componentDidMount() {

        this.recoverContext();
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

        setUserLS(this.state.user);

        this.context.updateUser(this.state.user);
        this.props.history.push("/home");
    }

    render (){
        
        const { name, surname, tags } = this.state.user;
console.log(tags);
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
                            <TagSelect onChange={this.handleChange} value={ tags } />
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