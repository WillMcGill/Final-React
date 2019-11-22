import React from 'react';
import Axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props)

    }

    getActive(){
        Axios.get('http://localhost:8000/api/active')
            .then(res =>{
                const data = res.data
                // localStorage.setItem('routes', res.data.data),
                localStorage.setItem('routes' , JSON.stringify(data.data))
                })
                
    }

    componentDidMount(){
        this.getActive();
    }

    render() {
        return (
            <>
                {this.props.page === 0 ?
                    <>
                        Not Logged In Home Page
                        <img id = "overview" src='./dots.png'/>
                    </>
                    : null}

                {this.props.page !== 0 ?
                    <>
                        Logged In Home Page
                    </>
                    : null}
            </>
        )
    }
}

export default Home 
