import React from 'react';
import axios from 'axios';

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this)
        this.logIn = this.logIn.bind(this)
        this.regNewUser = this.regNewUser.bind(this)
    }
    logOut() {
        const config = {
            headers: {
                'Authorization': "Bearer " +
                    this.props.token
            }
        }

        axios.get('http://127.0.0.1:8000/api/logout', config)
            .then(res => {
                localStorage.removeItem('token')
                this.props.getState("", 0)
            })
    }
    logIn() {
        this.props.getState(this.props.token, 1)
    }

    regNewUser() {
        this.props.getState(this.props.token, 3)
    }

    render() {

        return (
            <>
                <nav className="navbar navbar-expand-lg bg-light">
                    <ul className="navbar-nav ml-auto">
                        
                            
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" />
                            <ul className="navbar-nav mx-auto">

                            {this.props.page === 0 ?
                                <>

                                    <a className="nav-item nav-link" onClick={this.logIn}>Log In</a>
                                    <a className="nav-item nav-link" onClick={this.regNewUser}>Register</a>
                                </>
                                : null}

                            {this.props.page !== 0 ?
                                <a className="nav-item nav-link" onClick={this.logOut}>Logout</a>
                                : null}
                        </ul>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navbar
