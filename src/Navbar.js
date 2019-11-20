import React from 'react';

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.NavItems = [
             { name: "Logout", URL: '#', target: '_SELF'}
        ]
        this.clearLocal = this.clearLocal.bind(this)
    }
clearLocal(){
    localStorage.removeItem('token')
    this.props.getState("" , 0)


}




    render(){
     
        return(
            <>
            <nav className="navbar navbar-expand-lg navbar bg-light">
                
                    <ul className="navbar-nav ml-auto">
                        <ul className="navbar-nav mx-auto">

                        <a className="nav-item nav-link" onClick={this.clearLocal}>Logout </a>

                        </ul>
                    </ul>
                
            </nav>
            </>
        )

    }
}

export default Navbar
// ()=> this.props.getState("", 0)