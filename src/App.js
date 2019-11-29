import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Login from './Login'
import Home from './Home'
import Navbar from './Navbar'
import Register from './Register'
import Admin from './Admin'


class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      token: '',
      page: 0
    }

    this.getTokenFromChild = this.getTokenFromChild.bind(this);
    this.clearRoutesNoToken = this.clearRoutesNoToken.bind(this);
  }

  clearRoutesNoToken(){
    if (this.state.token == ''){
      localStorage.removeItem('routes')
    }
  }

  getTokenFromChild(token, page) {
    this.setState({
      token: token,
      page: page
    })
  }

  componentDidMount(){
    this.clearRoutesNoToken()
  }

  render() {


    return (
      <div className="App">

        {this.state.page === 0 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Home page={this.state.page} />
          </>
          : null}

        {this.state.page === 1 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Login isLogin={this.getTokenFromChild} />
          </>
          : null}

        {this.state.page === 2 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Register getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} isLogin={this.getTokenFromChild} />
          </>
          : null}

        {this.state.page === 3 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Home page={this.state.page} />
            <Admin />
          </>
          : null}

        {this.state.page === 4 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Home page={this.state.page} />
          </>
          : null}

      </div>
    );
  }
}

export default App;
