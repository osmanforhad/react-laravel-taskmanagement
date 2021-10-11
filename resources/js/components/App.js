import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PUBLIC_URL } from '../constants';
import { checkIfAuthenticated } from '../services/AuthService';

//Lyouts
import Footer from './layouts/Footer';
import Header from './layouts/Header';
//Pages
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthenticatedRoutes from './pages/AuthenticatedRoutes';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProjectCreate from './pages/projects/ProjectCreate';
import ProjectList from './pages/projects/ProjectList';
import ProjectView from './pages/projects/ProjectView';

class App extends Component {
  state = {
    user: {},
    isLoggedIn: false
  };
  componentDidMount() {
    if (checkIfAuthenticated()) {
      this.setState({
        user: checkIfAuthenticated(),
        isLoggedIn: true
      });
    }
  };
  render() {
    return (
      <div>
        <Router>
          <Header authData={this.state} />
          <div>

            <Container className="p-4">
              <Switch>
                <Route path={`${PUBLIC_URL}`} exact={true} component={Home} />
                <Route path={`${PUBLIC_URL}about`} exact={true} component={About} />
                <Route path={`${PUBLIC_URL}contact`} exact={true} component={Contact} />
                <Route path={`${PUBLIC_URL}login`} exact={true} component={Login} />
                <Route path={`${PUBLIC_URL}register`} exact={true} component={Register} />

                {/** Private Authenticated Route */}
                <AuthenticatedRoutes authed={this.state.isLoggedIn} path={`${PUBLIC_URL}projects/view/:id`} component={ProjectView} />
                <AuthenticatedRoutes authed={this.state.isLoggedIn} path={`${PUBLIC_URL}projects/create`} component={ProjectCreate} />
                <AuthenticatedRoutes authed={this.state.isLoggedIn} path={`${PUBLIC_URL}projects`} component={ProjectList} />
                {/** Private Authenticated Route */}

              </Switch>
              <Footer />
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
