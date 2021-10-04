import React, {Component} from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import { PUBLIC_URL } from '../constants';

  //Lyouts
import Footer from './layouts/Footer';
import Header from './layouts/Header';
//Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProjectCreate from './pages/projects/ProjectCreate';
import ProjectList from './pages/projects/ProjectList';

class App extends Component {
    render() { 
        return(
            <div>
               <Router>
               <Header/>
      <div>

        <Container className="p-4">
        <Switch>
          <Route path={`${PUBLIC_URL}about`}>
            <About />
          </Route>
          <Route path={`${PUBLIC_URL}contact`}>
            <Contact />
          </Route>
          <Route path={`${PUBLIC_URL}projects/create`}>
            <ProjectCreate />
          </Route>
          <Route path={`${PUBLIC_URL}projects`}>
            <ProjectList />
          </Route>
          <Route path={`${PUBLIC_URL}`}>
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
