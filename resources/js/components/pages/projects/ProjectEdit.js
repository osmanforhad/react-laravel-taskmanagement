import axios from 'axios';
import React from 'react';
import { Button, Spinner, Form, Card } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { updateProject } from '../../../services/ProjectService';


class ProjectEdit extends React.Component {
  state = {
    isLoading: false,
    id: this.props.project.id,
    name: this.props.project.name,
    description: this.props.project.description,
    status: this.props.project.status,
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

  submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;

    this.setState({ isLoading: true });

    const postBody = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
    };
    const response = await updateProject(this.state.id, postBody);
    if (response.success) {
      this.setState({
        name: "",
        description: "",
        isLoading: false,
      });
      this.props.onCompleteProjectEdit();

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
          <Form onSubmit={this.submitForm}>

            <div className="row mb-2">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Project Name"
                    value={this.state.name} name="name" onChange={(e) => this.changeInput(e)} />
                </Form.Group>
                {this.state.errors && this.state.errors.name && (
                  <p className="text-danger">{this.state.errors.name[0]}</p>
                )}
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control type="text" as="textarea" rows="2" placeholder="Enter Project Description"
                    value={this.state.description} name="description" onChange={(e) => this.changeInput(e)} />
                </Form.Group>
                {this.state.errors && this.state.errors.description && (
                  <p className="text-danger">{this.state.errors.description[0]}</p>
                )}
              </div>
              <div className="col-6">
                <Form.Label>Project Status</Form.Label>
                <Form.Control as="select" value={this.state.status} name="status" onChange={(e) => this.changeInput(e)}>
                  <option value={0}>Pending</option>
                  <option value={1}>Completed</option>
                </Form.Control>
                {this.state.errors && this.state.errors.status && (
                  <p className="text-danger">{this.state.errors.status[0]}</p>
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
                Update Project
              </Button>
            }
          </Form>
        </Card.Body>
      </Card>
    </div>;
  }
}

export default withRouter(ProjectEdit);