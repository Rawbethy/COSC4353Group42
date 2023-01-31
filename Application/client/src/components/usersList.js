import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = {
    table: {
        position: 'relative',
        top: '50px',
        left: '50px',
        paddinginline: '20%'
    }
}

export default class usersList extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            users: []
        }
        this.getUsers = this.getUsers.bind(this);
    };

    getUsers() {
        axios.get("http://localhost:5000/users").then((res) => {
            const users = res.data;
            this.setState({users})
        }).catch((err) => {
            alert("Error: " + err)
        })
    }

    componentDidMount() {
        this.getUsers()
    }
    
    render() {
        return (
            <table class="table" style={Styles.table}>
                <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        List of Users
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map((user,i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        {user.username}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}