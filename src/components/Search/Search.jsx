import React from "react";
import AppNavbar from '../AppNavbar/AppNavbar';
import { Container, Row, Col, Button }  from 'react-bootstrap';
import AdList    from '../AdList/AdList';
import TagSelect from '../TagsSelect/TagSelect'
import Input     from '../Input/Input'
import * as API  from '../../services/AdService';
import { UserContext } from '../../context/UserContext'
import { getUserLS, isEmpty } from '../../utils/localStorage';

const TYPES = ['sell', 'buy']

export default class Search extends React.Component {

    /* Show ads by filters */

    static contextType = UserContext;


    constructor(props) {
        super(props);

        const user = getUserLS();
        if (isEmpty(user)) {

            this.gotoRegisterWithoutUser();
            this.state = { ads: [] };
        } else {

            this.state = {
                ads: [],
                tags: '',
                type: '',
                name: '',
                minPrice: '',
                maxPrice: ''
            }

            this.searchAds();
        }

        this.handleChange = this.handleChange.bind(this);
        this.reset = this.reset.bind(this);
    }

    searchAds = () => {

        const { tags, name, type } = this.state;
        let searchString = tags === '' ? '' : `tag=${tags}&`;
        searchString += name === '' ? '' : `name=${name}&`;
        
        if(type !== '')
            searchString += type === 'sell' ? 'venta=true&' : `venta=false&`;
        

        API.searchAds(searchString)
            .then(ads => {
            this.setState({
                ads
            })
        });
    }

    componentDidMount() {

        this.recoverContext();
    }

    gotoRegisterWithoutUser() {

        this.props.history.push("/register");
    }

    recoverContext() {
        //Recover context from localStorage (recovered on this.state.user)

        if (isEmpty(this.context.user))
            this.context.updateUser(this.state.user);
    }


    handleChange(event) {

        const { name, value } = event.target;
        // console.log(name, value);

        this.setState({
            ads: [],    // reset 
            [name]: value
        }, () => this.searchAds()); // search after setState via callback

    }
    
    reset () {
        
        window.location.reload(false);
    }
    

    render() {
        const { ads, tags, name, type } = this.state;

        return (
            <>
                <AppNavbar />
                <Container className='container mt-5 mb-5 p-5 card'>
                    <h3 className="mb-4">Search products:</h3>
                    <Row>
                        <Col md={4} xs={12} >
                            Tag: <TagSelect onChange={this.handleChange} value={tags} />
                        </Col>
                        <Col md={4} xs={12} >
                            Name: <br/><Input clasName="formControl" onChange={this.handleChange} name={`name`} value={name} placeholder={`Pulse enter to end`} />
                        </Col>
                        <Col md={2} xs={12} >
                            Type:
                            <div key={`inline-${type}`}>
                                {TYPES.map(type => (
                                    <div key={`${type}`}>
                                        <input type='radio'
                                                name='type'
                                                value={`${type}`}
                                                onChange={this.handleChange}
                                                // checked={`${type}` === type}
                                            />
                                            <span style={{ textTransform: 'capitalize' }}>{` ${type}`}  </span>
                                    </div>
                                ))}
                            </div>
                        </Col>        
                    </Row>
                    <Row>
                        <Col xs={12} >

                            Price:<br />
                            <Input clasName="formControl" onChange={this.handleChange} name={`minPrice`} value={name} placeholder={`Min price`} />
                            /
                            <Input clasName="formControl" onChange={this.handleChange} name={`maxPrice`} value={name} placeholder={`Max price`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} >
                            <Button variant="primary" className="float-right" onClick={this.reset}>
                                Reset
                            </Button>
                        </Col> 
                    </Row>           
                </Container>

                {
                    ads
                    &&
                    ads.length
                    &&
                    <AdList ads={ads} />
                }
            </>
        );
    }
}