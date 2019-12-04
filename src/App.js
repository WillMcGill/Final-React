import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Login from './Login'
import Home from './Home'
import Navbar from './Navbar'
import Register from './Register'
import Admin from './Admin'
import UserView from './UserView'



class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      token: '',
      page: 0,
      render: 0
      
    }

    this.getTokenFromChild = this.getTokenFromChild.bind(this);
    this.clearRoutesNoToken = this.clearRoutesNoToken.bind(this);
    this.getRenderCallFromAdmin = this.getRenderCallFromAdmin.bind(this)
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

  getRenderCallFromAdmin(renderCall){
    setTimeout(this.setState({render: this.state.render + 1}), 1500)
    console.log(this.state.render)
  }

  render() {


    return (
      <div className="App">

        {this.state.page === 0 ?
          <><div className = "jumbotron h-100" id = "appbackground">
            <div class="jumbotron jumbotron-fluid p-2 w-50 mx-auto" id = "appbanner">
                    <div class="container">
                        <h1 class="display-3">Sloper</h1>
                        <p class="lead">Indoor Climbing Route Management</p>
                        <p>Login or Register to Continue</p>
                    </div>
                </div>
            <div className = "row d-flex">
              <div className = "card p-2 mx-auto mt-5 mb-5" id="appcard">
                <Login isLogin={this.getTokenFromChild} />
              </div>
            
              <div className = "card p-2 mx-auto mt-5 mb-5" id ="appcard">
                <Register getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} isLogin={this.getTokenFromChild} />
              </div>
            </div>
            </div>
          </>
          : null}

        {this.state.page === 2 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Home page={this.state.page} />            
            <UserView />
          </>
          : null}

        {this.state.page === 3 ?
          <>
            <Navbar getState={this.getTokenFromChild} token={this.state.token} page={this.state.page} />
            <Home page={this.state.page} render={this.state.render}/>
            <Admin   getRenderCallFromAdmin={this.getRenderCallFromAdmin}/>
          </>
          : null}
      </div>
    );
  }
}

export default App;
