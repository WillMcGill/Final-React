import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Login from './Login'
import axios from 'axios'
import Home from './Home'
import Navbar from './Navbar'
import Register from './Register'
import Admin from './Admin'


class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      token: '',
      page: 3
    }

    this.getTokenFromChild = this.getTokenFromChild.bind(this);
  }

  getTokenFromChild(token, page) {
    this.setState({ token: token,
                    page: page   })
  }

  render(){

    
    return (
      <div className="App">

        {this.state.page === 0  ? 
        <>
        <Navbar getState = {this.getTokenFromChild} token={this.state.token} page={this.state.page}/>
        <Home  page={this.state.page}/>
        </>
        : null}

        {this.state.page === 1 ?
        <>
        <Login isLogin={this.getTokenFromChild}/>
        </>
        : null}

        {this.state.page === 2 ?
        <>
        <Navbar getState = {this.getTokenFromChild} token={this.state.token} page={this.state.page}/>
        <Home  page={this.state.page}/>
        </>
        : null}

        {this.state.page === 3 ?
        <>
        <Navbar getState = {this.getTokenFromChild} token={this.state.token} page={this.state.page}/>
        <Home  page={this.state.page}/>
        <Admin />
        </>
        : null}

        {this.state.page === 4 ?
        <>
        <Register getState = {this.getTokenFromChild} token={this.state.token} page={this.state.page} isLogin={this.getTokenFromChild}/>
        </>
        : null} 
      </div>
          );
        }
  }

export default App;
