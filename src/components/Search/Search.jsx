import React from "react";
import AppNavbar from '../AppNavbar/AppNavbar';
import { Form }  from 'react-bootstrap';
import AdList    from '../AdList/AdList';
import TagSelect from '../TagsSelect/TagSelect'
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
                // tags: '',
                // minPrice: '',
                // maxPrice: '',
                // type: '',
                // name: ''
            }

            this.searchAds();
        }

        this.handleChange = this.handleChange.bind(this);
    }

    searchAds = () => {

        
        const { tags, ads } = this.state;
        const searchString = `?tag=${this.state.tags}&`

        console.log('searchString', searchString);
        console.log('tags', tags);
        console.log('this.state', this.state);


        // API.searchAds(`tag=${this.state.user.tags}`).then(ads => {
        API.searchAds(searchString).then(ads => {
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

        // this.setState(({ search }) => ({
        //     search: {
        //         ...search,
        //         [name]: value
        //     }
        // }));
        this.setState({
            [name]: value
        });

        this.searchAds();
    }   


    render() {
        const { ads, tags, type } = this.state;
        console.log(this.state);
        console.log(this.props.location.pathname);



        return (
            <>
                <AppNavbar />
                <div className='container mt-5 mb-5'>
                    <div className='card'>
                        <h3 className="mb-4">Search products:</h3>
                        
                        <div className="col-5 mb-3">
                            Tag: <TagSelect onChange={this.handleChange} value={tags} />
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