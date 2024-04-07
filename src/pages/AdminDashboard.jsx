import React from "react";
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
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { authData } = useAuth();

  // Mock data - replace with your data fetching logic
  const users = [
    { id: 1, name: "John Doe", role: "Advertiser" },
    { id: 2, name: "Jane Doe", role: "Publisher" },
  ];

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

        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Header as="h3">User Management</Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <Button icon>
                          <Icon name="edit" />
                        </Button>
                        <Button icon>
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
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
      </Grid>
    </AppLayout>
  );
}

export default AdminDashboard;
