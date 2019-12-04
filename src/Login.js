import React from 'react';
import Axios from 'axios';

class Login extends React.Component {


    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();



        Axios.post('https://sloper.appspot.com/api/login', this.state)
            .then(res => {
                const tokenData = res.data;
                const admin = tokenData.user.admin;
                this.props.isLogin(tokenData.token, 2 + admin);

                localStorage.setItem('token', tokenData.token)
                localStorage.setItem('user_id', tokenData.user.id);

            })
    }

    removeUserIdFromLocal() {

        if (localStorage.getItem('user_id')) {
            localStorage.removeItem('user_id')
        }

    }

    componentDidMount() {
        this.removeUserIdFromLocal();
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>

                    <div className="form-group ">
                        <label >Email address
                            <input type="email" autoComplete="off" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                        </label>
                    </div>

                    <div className="form-group ">
                        <label >Password
                            <input type="password" autoComplete="off" name='password' className="form-control" id="exampleInputPassword2" placeholder="Password" onChange={this.handleChange} />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary" onSubmit={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;