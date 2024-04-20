import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const userOptions = [
  { key: "advertiser", text: "Advertiser", value: "Advertiser" },
  { key: "publisher", text: "Publisher", value: "Publisher" },
];

const platformTypeOptions = [
  { key: "blog", text: "Blog", value: "Blog" },
  { key: "news", text: "News Site", value: "News Site" },
  { key: "forum", text: "Forum", value: "Forum" },
  { key: "ecommerce", text: "E-commerce", value: "E-commerce" },
  { key: "other", text: "Other", value: "Other" },
];

const Register = () => {
  const [userType, setUserType] = useState("Advertiser");
  const [platformType, setPlatformType] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    company: "",
    website: "",
    address: "",
    city: "",
    country: "",
    platformName: "",
    websiteUrl: "",
    contactName: "",
    monthlyViews: "",
    uniqueVisitors: "",
    method: "",
    details: "",
    ageRange: "",
    interests: "",
    location: "",
    platformType: "",
  });
  const [error, setError] = useState("");
  const { register, authData } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      const path = getRedirectPath(authData.role);
      navigate(path);
    }
  }, [authData, navigate]);

  const handleInputChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e, { value }) => setUserType(value);

  const handlePlatformTypeChange = (e, { value }) => setPlatformType(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const filteredData = { ...formData, role: userType, platformType };
    try {
      await register(filteredData);
      navigate(
        userType === "Advertiser"
          ? "/advertiser-dashboard"
          : "/publisher-dashboard"
      );
    } catch (registrationError) {
      setError(
        registrationError.message || "Registration failed. Please try again."
      );
    }
  };

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

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="teal" textAlign="center">
          Register
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Dropdown
              fluid
              placeholder="Select User Type"
              selection
              value={userType}
              options={userOptions}
              onChange={handleDropdownChange}
              style={{ marginBottom: "1em" }}
            />
            {userType === "Advertiser" && (
              <>
                <Form.Input
                  fluid
                  name="company"
                  icon="building"
                  iconPosition="left"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <Form.Input
                  fluid
                  name="website"
                  icon="world"
                  iconPosition="left"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
                {/* Additional Advertiser fields */}
              </>
            )}
            {userType === "Publisher" && (
              <>
                <Form.Input
                  fluid
                  name="platformName"
                  icon="clipboard"
                  iconPosition="left"
                  placeholder="Platform Name"
                  value={formData.platformName}
                  onChange={handleInputChange}
                />
                <Dropdown
                  fluid
                  placeholder="Select Platform Type"
                  selection
                  value={platformType}
                  options={platformTypeOptions}
                  onChange={handlePlatformTypeChange}
                  style={{ marginBottom: "1em" }}
                />
                <Form.Input
                  fluid
                  name="websiteUrl"
                  icon="linkify"
                  iconPosition="left"
                  placeholder="Website URL"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                />

                {/* Additional Publisher fields */}
              </>
            )}
            {error && <Message error>{error}</Message>}
            <Button color="teal" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account?{" "}
          <a href="" onClick={() => navigate("/login")}>
            Login here
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
