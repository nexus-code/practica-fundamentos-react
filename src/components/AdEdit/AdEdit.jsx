import React from "react";
import { withRouter }   from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { UserContext }  from '../../context/UserContext'
// import { setUserLS }    from '../../utils/localStorage';
import { createAd, updateAd }  from '../../services/AdService';
import AppNavbar        from '../AppNavbar/AppNavbar';


const TYPES = ['sell', 'buy']

class AdEdit extends React.Component { 


        /* Se ha tomado REGISTER como patrón */


    constructor(props) {
        super(props);

        console.log('init Register props', props);

        this.state = {
            advert: {
                name: '',
                price: 0,
                description: '',
                type: TYPES[0]
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const { name, value } = event.target;

        this.setState(({ advert }) => ({
            advert: {
                ...advert,
                [name]: value
            }
        }));
    }   

    handleSubmit(event) {
        event.preventDefault();
        console.log('submit', this.state);


        return false;

        const { name, price, description, type } = this.state;

        if (name.trim().length <= 3) {
            alert("The name must be bigger than 3 characters");
            return;
        }

        if (description.trim().length <= 12) {
            alert("The description must be bigger than 12 characters");
            return;
        }

        console.log('submit', this.state);


        return false;

        // this.props.history.push("/home");
    } 

    render() {

        return (
            <>
                <AppNavbar />
                <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                    <h2>Create / edit advertisement</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupName" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" placeholder="Product name" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPrice" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" placeholder="on €" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formGroupType" >
                            <Form.Label>Type</Form.Label>
                            {TYPES.map(type => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check inline type='radio' id={`check-api-${type}`}>
                                        <Form.Check.Input 
                                            name='type' 
                                            value={`${type}`} 
                                            type='radio' 
                                            onChange={this.handleChange} 
                                            />
                                        <Form.Check.Label style= {{textTransform:'capitalize'}}>{` ${type}`}</Form.Check.Label>
                                    </Form.Check>
                                </div>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="formGroupDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows="3" onChange={this.handleChange} />
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
            </>
        );
    }
}



AdEdit.contextType = UserContext;

export default withRouter(AdEdit);