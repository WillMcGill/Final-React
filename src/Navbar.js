import React from 'react';
import axios from 'axios';

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this)
        this.logIn = this.logIn.bind(this)
        this.regNewUser = this.regNewUser.bind(this)
        this.goHome = this.goHome.bind(this)
    }
    logOut() {
        const config = {
            headers: {
                'Authorization': "Bearer " +
                    this.props.token
            }
        }

        axios.get('https://sloper.appspot.com/api/logout', config)
            .then(res => {
                localStorage.removeItem('token')
                localStorage.removeItem('routes')
                this.props.getState("", 0)
            })
    }
    logIn() {
        this.props.getState(this.props.token, 1)
    }

    regNewUser() {
        this.props.getState(this.props.token, 2)
    }

    goHome(){
        this.props.getState(this.props.token, 0)
    }

    render() {

        return (
            <>
                <nav className="navbar navbar-expand-lg bg-light">
                    <ul className="navbar-nav ml-auto">
                        
                            
                            <div className="collapse navbar-collapse" id="navbarSupportedContent" />
                            <ul className="navbar-nav mx-auto">

                            {/* {this.props.page === 0 ?
                                <>
                                   <a className="nav-item nav-link" onClick={this.goHome} href ="#">Home</a>
                                   <a className="nav-item nav-link" onClick={this.logIn} href ="#">Log In</a>
                                   <a className="nav-item nav-link" onClick={this.regNewUser} href ="#">Register</a>
                                </>
                            : null} */}

                            {this.props.page > 1 ?
                                <span className="nav-item nav-link" onClick={this.logOut} 
                                // href ="#"
                                >Logout</span>
                            : null}
                        </ul>
                    </ul>
                </nav>
            </>
        )
    }
}

export default Navbar
