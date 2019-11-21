import React from 'react';
import Axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                {this.props.page === 0 ?
                    <>
                        Not Logged In Home Page
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
