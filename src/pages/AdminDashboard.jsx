import React, { useState, useEffect } from "react";
import {
  Grid,
  Segment,
  Table,
  Header,
  Button,
  Icon,
  List,
  Statistic,
  StatisticValue,
  StatisticLabel,
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";
import APIService from "../services/api.service";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const apiService = new APIService();
  const { authData } = useAuth();

  useEffect(() => {
    const subscription = apiService.subscribeToData("users", setUsers);
    return () => subscription.unsubscribe(); // Clean up subscription
  }, []);

  // Mock data - replace with actu data fetching logic
  const financialSummary = {
    totalRevenue: 12000,
    totalPayout: 8000,
    netProfit: 4000,
  };

  const campaigns = [
    {
      id: 1,
      name: "Spring Sale",
      status: "Active",
      impressions: 100000,
      clicks: 5000,
      conversions: 500,
    },
    {
      id: 2,
      name: "Summer Festival",
      status: "Paused",
      impressions: 75000,
      clicks: 3500,
      conversions: 450,
    },
  ];

  const handleDeleteUser = async (userId) => {
    try {
      await apiService.deleteData("users", userId);
      // Optionally refetch the user list or filter out the deleted user from state
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error (e.g., show an error message)
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
               {/* Add the link to the Publisher Dashboard */}
               <Link to="/publisher-dashboard">Go to Publisher Dashboard</Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Header as="h3">Financial Summary</Header>
              <Statistic size="mini">
                <StatisticValue>
                  ${financialSummary.totalRevenue}
                </StatisticValue>
                <StatisticLabel>Total Revenue</StatisticLabel>
              </Statistic>
              <Statistic size="mini">
                <StatisticValue>${financialSummary.totalPayout}</StatisticValue>
                <StatisticLabel>Total Payout</StatisticLabel>
              </Statistic>
              <Statistic size="mini">
                <StatisticValue>${financialSummary.netProfit}</StatisticValue>
                <StatisticLabel>Net Profit</StatisticLabel>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as="h3">Campaign Overview</Header>
              <List divided relaxed>
                {campaigns.map((campaign) => (
                  <List.Item key={campaign.id}>
                    <List.Content>
                      <List.Header>{campaign.name}</List.Header>
                      <List.Description>
                        Status: {campaign.status} - Impressions:{" "}
                        {campaign.impressions} - Clicks: {campaign.clicks} -
                        Conversions: {campaign.conversions}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header as="h3">User Management</Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <Button icon>
                          <Icon name="edit" />
                        </Button>
                        <Button icon>
                          <Icon
                            name="trash"
                            onClick={() => handleDeleteUser(user._id)}
                          />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </AppLayout>
  );
}

export default AdminDashboard;
