import axios from 'axios';
import React from 'react';
import { Button, Spinner, Form, Card} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { storeNewProject } from '../../../services/ProjectService';


class ProjectCreate extends React.Component {
  state = {
    isLoading: false,
    name: '',
    description: '',
    errors: {},
  };

  componentDidMount() {
    
  }

  changeInput = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  };

  submitForm = async(e) => {
    e.preventDefault();
    const {history} = this.props;

    this.setState({isLoading: true});
    
    const postBody = {
      name: this.state.name,
      description: this.state.description,
    };
   const response = await storeNewProject(postBody);
   if(response.success) {
     this.setState({
       name: "",
       description: "",
       isLoading: false,
     });
     history.push(`${PUBLIC_URL}projects`);
     
   } else {
    this.setState({
      errors: response.errors,
      isLoading: false,
    });
   }
  };

 

  render() { 
    return <div>
      <div className="header-part">
        <div className="float-left">
        <h2>New Project</h2>
        </div>
        <div className="float-right">
            <Link to={`${PUBLIC_URL}projects`} className="btn btn-info">All Project</Link>
        </div>
        <div className="clearfix"></div>
      </div>

<Card>
  <Card.Body>
  <Form onSubmit={this.submitForm}>
    
  <Form.Group className="mb-3" controlId="name">
    <Form.Label>Project Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Project Name" 
    value={this.state.name} name="name" onChange={(e) => this.changeInput(e)}/>
  </Form.Group>
  {this.state.errors && this.state.errors.name && (
            <p className="text-danger">{this.state.errors.name[0]}</p>
          )}

  <Form.Group className="mb-3" controlId="description">
  <Form.Label>Project Description</Form.Label>
    <Form.Control type="text" as="textarea" rows="5" placeholder="Enter Project Description" 
    value={this.state.description} name="description" onChange={(e) => this.changeInput(e)}/>
  </Form.Group>
  {this.state.errors && this.state.errors.description && (
            <p className="text-danger">{this.state.errors.description[0]}</p>
          )}

  {this.state.isLoading &&
    <Button variant="primary" type="button" disabled>
    <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>
Saving...
  </Button>
  }
   {!this.state.isLoading &&
    <Button variant="primary" type="submit">
    Save Project
  </Button>
  }
</Form>
  </Card.Body>
</Card>
    </div>;
  }
}

  export default withRouter(ProjectCreate);