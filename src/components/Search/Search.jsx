import React from "react";
import AppNavbar from '../AppNavbar/AppNavbar';
import { Form }  from 'react-bootstrap';
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
                // minPrice: '',
                // maxPrice: '',
                type: '',
                name: ''
            }

            this.searchAds();
        }

        this.handleChange = this.handleChange.bind(this);
    }

    searchAds = () => {

        
        const { tags, name } = this.state;
        let searchString = tags === '' ? '' : `tag=${this.state.tags}&`;
        searchString += name === '' ? '' : `name=${this.state.name}&`;
        // const searchString = `tag=work&`

        console.log('tags', tags);

        console.log('searchString', searchString);
        // console.log('tags', tags);
        // console.log('this.state', this.state);


        // API.searchAds(`tag=${this.state.user.tags}`).then(ads => {
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

    render() {
        const { ads, tags, name, type } = this.state;

        return (
            <>
                <AppNavbar />
                <div className='container mt-5 mb-5'>
                    <h3 className="mb-4">Search products:</h3>
                        
                    <div className="col-5 mb-3">
                        Tag: <TagSelect onChange={this.handleChange} value={tags} />
                    </div>
                    <div className="col-5 mb-3">
                        Name: <Input onChange={this.handleChange} name={`name`} value={name} placeholder={`Pulse enter to end`} />
                    </div>
                    <div className="col-5 mb-3">
                        Type:
                        <div key={`inline-${type}`} className="mb-3">
                            {TYPES.map(type => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check inline type='radio' id={`check-api-${type}`}>
                                        <Form.Check.Input
                                            name='type'
                                            value={`${type}`}
                                            type='radio'
                                            onChange={this.handleChange}
                                            checked={`${type}` === type}
                                        />
                                        <Form.Check.Label style={{ textTransform: 'capitalize' }}>{` ${type}`}</Form.Check.Label>
                                    </Form.Check>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

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