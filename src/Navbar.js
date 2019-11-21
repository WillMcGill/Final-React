import React from 'react';
import axios from 'axios';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.NavItems = [
            { name: "Logout", URL: '#', target: '_SELF' }
        ]
        this.logOut = this.logOut.bind(this)
    }
    logOut() {
        const config = {
            headers: {
                'Authorization': "Bearer " +
                    this.props.token
           
            }
            
        }
        console.log(config)
        axios.get('http://127.0.0.1:8000/api/logout', config)
            .then(res => {

                localStorage.removeItem('token')
                this.props.getState("", 0)
                
            })
    }

    render() {

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar bg-light">
                    <ul className="navbar-nav ml-auto">
                        <ul className="navbar-nav mx-auto">
                            <a className="nav-item nav-link" onClick={this.logOut}>Logout </a>
                        </ul>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navbar
// ()=> this.props.getState("", 0)