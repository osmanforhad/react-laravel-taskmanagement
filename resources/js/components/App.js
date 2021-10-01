import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  //Lyouts
import Footer from './layouts/Footer';
import Header from './layouts/Header';
//Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProjectList from './pages/projects/ProjectList';

class App extends Component {
    state = {
       PUBLIC_URL: "/react-laravel/task-management/"
    };


    render() { 
        return(
            <div>
               <Router>
               <Header/>
      <div>

        <Container className="p-4">
        <Switch>
          <Route path={`${this.state.PUBLIC_URL}about`}>
            <About />
          </Route>
          <Route path={`${this.state.PUBLIC_URL}contact`}>
            <Contact />
          </Route>
          <Route path={`${this.state.PUBLIC_URL}projects`}>
            <ProjectList />
          </Route>
          <Route path={`${this.state.PUBLIC_URL}`}>
            <Home />
          </Route>
        </Switch>
           <Footer/>
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
