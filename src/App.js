import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Login from './Login'
import axios from 'axios'
import Home from './Home'
import Navbar from './Navbar'


class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      token: '',
      page: 0
    }
    this.emailData = '';

    // this.apiPull = this.apiPull.bind(this);
    this.getTokenFromChild = this.getTokenFromChild.bind(this);
  }

  getTokenFromChild(token, page) {
    this.setState({ token: token,
                    page: page   })
  }

  render(){

    // console.log(this.state)
    return (
      <div className="App">

        {this.state.page == 0  ? 
        <Login isLogin={this.getTokenFromChild}/>
        : null}

        {this.state.page != 0 ?
        <>
        <Navbar getState = {this.getTokenFromChild} token={this.state.token}/>
        <Home />

        </>
        : null}
        
      </div>
          );
        }
  }

export default App;
