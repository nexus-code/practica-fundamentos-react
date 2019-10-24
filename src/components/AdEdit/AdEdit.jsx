import React from "react";
import { withRouter }   from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { UserContext }  from '../../context/UserContext'
import { setUserLS }    from '../../utils/localStorage';
//import * as API from '../../services/NodepopService';

class AdEdit extends React.Component { 


        /* Se ha tomado REGISTER como patrón */


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

        if (this.state.user.name.trim().length <= 3) {
            alert("The name must be bigger than 3 characters");
            return;
        }

        if (this.state.user.surname.trim().length <= 3) {
            alert("The surname must be bigger than 3 characters");
            return;
        }

        // console.log('submit', this.state);
        // console.log('selectedOption', TagSelect.selectedOption);

        // return false;

        setUserLS(this.state.user);

        this.context.updateUser(this.state.user);
        this.props.history.push("/home");
    } 

    render() {

        return (

            <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                <h2>Create / edit advertisement</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupName" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" placeholder="Product name" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGroupPrice" >
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" placeholder="price" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGroupType" >
                        {['sell', 'buy'].map(type => (
                            <div key={type} className="mb-3">
                                <Form.Check type='radio' id={`check-api-${type}`}>
                                    <Form.Check.Input type='radio' isValid />
                                    <Form.Check.Label>{` ${type}`}</Form.Check.Label>
                                </Form.Check>
                            </div>
                        ))}
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" />
                    </Form.Group>
                    {/* <Form.Group controlId="formGrouptags" >
                        <Form.Label>Tags</Form.Label>
                        <TagSelect onChange={this.handleSelectChange} />
                    </Form.Group> */}

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        );
    }
}



AdEdit.contextType = UserContext;

export default withRouter(AdEdit);