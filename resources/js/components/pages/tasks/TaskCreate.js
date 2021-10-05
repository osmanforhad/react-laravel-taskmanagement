import axios from 'axios';
import React from 'react';
import { Button, Spinner, Form, Card} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { storeNewTask } from '../../../services/TaskService';


class TaskCreate extends React.Component {
  state = {
    isLoading: false,
    name: '',
    description: '',
    errors: {},
  };

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
      project_id: this.props.project_id,
    };
   const response = await storeNewTask(postBody);
   if(response.success) {
     this.setState({
       name: "",
       description: "",
       isLoading: false,
     });
     this.props.onCompleteTaskCreate(response.data);
   } else {
    this.setState({
      errors: response.errors,
      isLoading: false,
    });
   }
  };

 

  render() { 
    return <div>
<Card>
  <Card.Body>
  <h2>New Task</h2>
  <Form onSubmit={this.submitForm}>
    
  <div className="row">
    <div className="col-6">
    <Form.Group className="mb-3" controlId="name">
    <Form.Label>Task Title</Form.Label>
    <Form.Control type="text" placeholder="Enter Task Title" 
    value={this.state.name} name="name" onChange={(e) => this.changeInput(e)}/>
  </Form.Group>
  {this.state.errors && this.state.errors.name && (
            <p className="text-danger">{this.state.errors.name[0]}</p>
          )}
    </div>

    <div className="col-6">
    <Form.Group className="mb-3" controlId="description">
  <Form.Label>Task Description</Form.Label>
    <Form.Control type="text" as="textarea" rows="3" placeholder="Enter Task Description" 
    value={this.state.description} name="description" onChange={(e) => this.changeInput(e)}/>
  </Form.Group>
  {this.state.errors && this.state.errors.description && (
            <p className="text-danger">{this.state.errors.description[0]}</p>
          )}
    </div>
  </div>

  

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
    Save Task
  </Button>
  }
</Form>
  </Card.Body>
</Card>
    </div>;
  }
}

  export default withRouter(TaskCreate);