import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Icon,
  Segment,
  Header,
  Statistic,
  List,
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";
import APIService from "../services/api.service";
import { useAuth } from "../context/AuthContext";
import AS_TABLE from "../shared/AS_TABLE"; // Import AS_TABLE component

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const apiService = new APIService();
  const { authData } = useAuth();

  useEffect(() => {
    const subscription = apiService.subscribeToData("users", setUsers);
    return () => subscription.unsubscribe(); // Clean up subscription
  }, []);

  // Define columns configuration for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, user) => (
        <>
          <Button icon>
            <Icon name="edit" />
          </Button>
          <Button icon onClick={() => handleDeleteUser(user._id)}>
            <Icon name="trash" />
          </Button>
        </>
      ),
    },
  ];

  // Function to delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await apiService.deleteData("auth", userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <AppLayout>
      <Grid container style={{ padding: "20px" }}>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <h1>
                Welcome,{" "}
                {authData.username.charAt(0).toUpperCase() +
                  authData.username.slice(1)}
              </h1>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        {/* Financial Summary Segment */}
        {/* Your existing financial summary segment */}

        {/* Campaign Overview Segment */}
        {/* Your existing campaign overview segment */}

        {/* User Management Segment */}
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header as="h3">User Management</Header>
              {/* Replace existing table with AS_TABLE */}
              <AS_TABLE
                columns={columns}
                dataSource={users}
                loading={!users.length}
                responsive
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  );
}

export default AdminDashboard;
