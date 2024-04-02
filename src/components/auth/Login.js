import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold login errors
  const { login, authData, error: authError } = useAuth(); // Destructuring to include error from AuthContext
  let navigate = useNavigate();

  useEffect(() => {
    // Redirecting upon successful authentication
    if (authData) {
      const path = getRedirectPath(authData.role);
      navigate(path);
    }
  }, [authData, navigate]);

  // Error state is updated based on errors from the authentication context
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const getRedirectPath = (role) => {
    switch (role) {
      case "Admin":
        return "/admin-dashboard";
      case "Advertiser":
        return "/advertiser-dashboard";
      case "Publisher":
        return "/publisher-dashboard";
      default:
        return "/";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors

    try {
      await login(email, password);
      // No need to set authData here, AuthProvider will handle upon successful login
    } catch (loginError) {
      // Error handling is more specific with the refactored authService
      setError(loginError.message);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Login
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Message size="tiny" negative>
                {error}
              </Message>
            )}{" "}
            {/* Displaying errors */}
            <Button color="teal" fluid size="small">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an account yet?{" "}
          <a href="" onClick={() => navigate("/register")}>
            {" "}
            {/* Fixed href */}
            Register Here
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
