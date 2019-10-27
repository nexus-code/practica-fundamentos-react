import React from "react";
import { Form, Button } from 'react-bootstrap';
import { UserContext }  from '../../context/UserContext'
import { setUserLS, getUserLS, isEmpty }    from '../../utils/localStorage';
import AppNavbar        from '../AppNavbar/AppNavbar';
import TagSelect        from '../TagsSelect/TagSelect'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Profile extends React.Component { 

    /* Manage user data */
    static contextType = UserContext;


    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                surname: '',
                tags: ['']
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

        toast.configure({
            autoClose: 8000,
            draggable: false,
        });
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

        const { name, surname } = this.state.user;


        if (name.trim().length <= 3) {
            alert("The name must be bigger than 3 characters");
            return;
        }

        if (surname.trim().length <= 3) {
            alert("The surname must be bigger than 3 characters");
            return;
        }

        try {
            
            setUserLS(this.state.user);
            this.context.updateUser(this.state.user);

            this.notifySaved();

        } catch (error) {
            
            this.notifyError();            
        }

    }

    notifySaved = () => toast.success('Advertisement saved !', { containerId: 'OK' });
    notifyError = () => toast.error('Error on save !', { containerId: 'KO' });

    render (){
        
        const { name, surname, tags } = this.state.user;

        return (
            <>
                <AppNavbar />
                <ToastContainer enableMultiContainer containerId={'OK'} position={toast.POSITION.TOP_RIGHT} />
                <ToastContainer enableMultiContainer containerId={'KO'} position={toast.POSITION.TOP_RIGHT} />

                <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                    <h2>Edit profile</h2>
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
                            <TagSelect onChange={this.handleChange} value={ [tags] } />
                        </Form.Group>

                        <Button variant="primary float-right" type="submit">
                            Save
                        </Button>
                    </Form>
                </div>
            </>
        );
    }
}