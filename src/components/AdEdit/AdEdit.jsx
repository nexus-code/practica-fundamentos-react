import React from "react";
import { withRouter }   from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { UserContext }  from '../../context/UserContext'
import { saveAd, getAdDetail } from '../../services/AdService';
import { getUserLS, isEmpty } from '../../utils/localStorage';
import AppNavbar        from '../AppNavbar/AppNavbar';
import TagSelect        from '../TagsSelect/TagSelect'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TYPES = ['sell', 'buy'];

class AdEdit extends React.Component { 

    // Create & update Ads
    // On create change page title and disables save button

    constructor(props) {
        super(props);

        const user = getUserLS();
        if (isEmpty(user)) {

            this.gotoRegisterWithoutUser();
            return;
        }

        this.state = {
            advert: {
                id: '',
                name: '',
                price: '',
                description: '',
                type: TYPES[0],
                photo: '',
                tags:[]
            },
            title: 'Create advertisement',
            method: 'POST',
            status: false
        };
        
        if (this.props.match.params.hasOwnProperty('id')) {
            const AdID = this.props.match.params.id;

            getAdDetail(AdID).then(advert => {

                if (advert.hasOwnProperty('success')) {

                    this.props.history.push("/404");
                } else {

                    this.setState({
                        advert: advert,
                        title: `Edit advertisement #${AdID}`,
                        method: 'PUT'
                    });
                }
            });
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        toast.configure({
            autoClose: 8000,
            draggable: false,
        });
    }

    gotoRegisterWithoutUser() {

        this.props.history.push("/register");
    }

    componentDidMount() {

        this.recoverContext();
    }

    recoverContext() {
        //Recover context from localStorage (recovered on this.state.user)

        if (isEmpty(this.context.user))
            this.context.updateUser(getUserLS());
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

        // console.log('submit', this.state);
        // return false;

        const { name, price, description, photo } = this.state.advert;

        if (name.trim().length <= 3) {
            alert("The name must be bigger than 3 characters");
            return;
        }

        if (description.trim().length <= 12) {
            alert("The description must be bigger than 12 characters");
            return;
        }

        if (price <= 0) {
            alert("The price must be bigger than 0 €");
            return;
        }

        if (photo.trim().length <= 3) {
            alert("The path to photo must be bigger than 3 characters");
            return;
        }        

        saveAd(this.state.advert, this.state.method, this.state.advert.id)
            .then (res => { 

                    console.log('res', res)
                    if (res === 'OK') {
                        
                        if (this.state.method === 'POST')
                            this.setState({ 
                                title: 'Advertisement saved!',
                                status: true
                            });

                        this.notifySaved();
                    } else {
                        this.notifyError();
                    }
                })
            .catch(res => {
                
                console.log('res', res)
            })


        return false;
    } 

    gotoHome = () => this.props.history.push('/');

    notifySaved = () => toast.success('Advertisement saved !', { containerId: 'OK' });
    notifyError = () => toast.error('Error on save !', { containerId: 'KO' });

    render() {

        if (isEmpty(this.state)) {

            // there is no local user but the component needs to be rendered
            return (<></>);
        }

        const { advert, title, status } = this.state;

        return (
            <>
                <AppNavbar />
                <ToastContainer enableMultiContainer containerId={'OK'} position={toast.POSITION.TOP_RIGHT} />
                <ToastContainer enableMultiContainer containerId={'KO'} position={toast.POSITION.TOP_RIGHT} />
                
                <div style={{ padding: "20px", maxWidth: "420px", margin: "50px auto" }}>
                    <h2>{title}</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupName" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" placeholder="Product name" value={advert.name} onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGroupPrice" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" placeholder="on €" value={advert.price} onChange={ this.handleChange } type="number" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPhoto" >
                            <Form.Label>Photo</Form.Label>
                            <Form.Control name="photo" placeholder="Select a prety photo" value={advert.photo} onChange={ this.handleChange } />
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
                                            onChange={ this.handleChange }
                                            checked = { `${type}` === advert.type}
                                            />
                                        <Form.Check.Label style= {{textTransform:'capitalize'}}>{` ${type}`}</Form.Check.Label>
                                    </Form.Check>
                                </div>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="formGroupDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows="3" value={advert.description} onChange={ this.handleChange } />
                        </Form.Group>
                        <Form.Group controlId="formGrouptags" >
                            <Form.Label>Tag</Form.Label>
                            <TagSelect onChange={this.handleChange}  value={ advert.tags } isMulti />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={status}>
                            Save
                        </Button>
                        <Button variant="secondary" className="float-right" onClick={ this.gotoHome }>
                            Exit
                        </Button>
                    </Form>
                </div>
            </>
        );
    }
}

AdEdit.contextType = UserContext;

export default withRouter(AdEdit);