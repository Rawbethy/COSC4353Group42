import React, {Component} from 'react';
import axios from 'axios';

export default class createUser extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    };


    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username
        }
        axios.post('http://localhost:5000/users/createUser', {user}).then((res) => {
            alert("User Created Successfully!")
            window.location = '/'
        }).cath((err) => {
            window.location = '/'
            alert("Error")
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Enter New Username: 
                        <input type="text" onChange={this.onChangeUsername}/>
                    </label>
                    <input type="submit" value="Submit Username"/>
                </form>
            </div>
        )
    }
}