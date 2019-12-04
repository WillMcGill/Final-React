import React from 'react';
import Axios from 'axios';

class Register extends React.Component {

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

    async handleSubmit(event) {
        event.preventDefault();


        await Axios.post('https://sloper.appspot.com/api/register', this.state)
            .then(res => {
                const tokenData = res.data;
                localStorage.setItem('token', tokenData.token)
            })

        await Axios.post('https://sloper.appspot.com/api/login', this.state)
            .then(res => {
                this.props.isLogin(localStorage.getItem('token'), 2);
            })
    }
    render() {


        return (
            <>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Register</h1>

                        <div className="form-group autocomplete">
                            <label>Name
                            <input type="name" name='name' className="form-control" id="nameExample" aria-describedby="nameHelp" placeholder="Enter name" onChange={this.handleChange} />
                            </label>
                        </div>

                        <div className="form-group autocomplete">
                            <label>Email address
                            <input type="email" name='email' className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
                            </label>
                        </div>

                        <div className="form-group autocomplete">
                            <label>Password
                            <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleChange} />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" onSubmit={this.registerUser}>Submit</button>
                    </form>
                </div>
            </>
        )
    }
}

export default Register