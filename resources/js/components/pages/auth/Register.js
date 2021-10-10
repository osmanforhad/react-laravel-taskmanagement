import axios from 'axios';
import React from 'react';
import { Button, Spinner, Form, Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { registerUser } from '../../../services/AuthService';


class Register extends React.Component {
  state = {
    isLoading: false,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: {},

    validated: false,
  };

  componentDidMount() {

  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      validated: true,
    });

    const { history } = this.props;

    const postBody = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    if (form.checkValidity() !== false) {
      e.preventDefault();
      this.setState({ isLoading: true });
      const response = await registerUser(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          isLoading: false,
          errors: {},
        });
        localStorage.setItem("loginData", JSON.stringify(response));
        //history.push(`${PUBLIC_URL}projects`);

      } else {
        this.setState({
          errors: response.errors,
          isLoading: false,
        });
        localStorage.setItem('loginData', null);
      }
    }
  };



  render() {
    return <div>
      <div className="header-part">
        <div className="float-left">
          <h2>Sign Up</h2>
        </div>
        <div className="clearfix"></div>
      </div>

      <Card>
        <Card.Body>
          <Form noValidate validated={this.state.validated} onSubmit={this.submitForm}>

            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control required type="text" placeholder="Enter your Name"
                    value={this.state.name} name="name" onChange={(e) => this.changeInput(e)} />
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Please give your name.
                  </Form.Control.Feedback>
                </Form.Group>

              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>User Email</Form.Label>
                  <Form.Control required type="email" placeholder="Enter Email"
                    value={this.state.email} name="email" onChange={(e) => this.changeInput(e)} />
                  {this.state.errors && this.state.errors.email && (
                    <p className="text-danger">{this.state.errors.email[0]}</p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Please give an valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>User Password</Form.Label>
                  <Form.Control required type="password" placeholder="Enter Password"
                    value={this.state.password} name="password"
                    onChange={(e) => this.changeInput(e)} minLength={8} />
                  {this.state.errors && this.state.errors.password && (
                    <p className="text-danger">{this.state.errors.password[0]}</p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Please give password.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Group className="mb-3" controlId="password_confirmation">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control required type="password" placeholder="Re Enter Password"
                    value={this.state.password_confirmation} name="password_confirmation"
                    onChange={(e) => this.changeInput(e)} minLength={8} />
                  {this.state.errors && this.state.errors.password_confirmation && (
                    <p className="text-danger">{this.state.errors.password_confirmation[0]}</p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Please give confirm password.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            {this.state.isLoading &&
              <Button variant="primary" type="button" disabled>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                Signing Up...
              </Button>
            }
            {!this.state.isLoading &&
              <Button variant="success" type="submit">
                Sign Up
              </Button>
            }
          </Form>
        </Card.Body>
      </Card>
    </div>;
  }
}

export default withRouter(Register);