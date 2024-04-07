import React from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  Icon,
  List,
  Statistic,
  StatisticValue,
  StatisticLabel,
  Table,
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";

function PublisherDashboard() {
  const { authData } = useAuth();
  // Mock data for ad zones and performance
  const adZones = [
    { id: 1, name: "Homepage Banner", type: "Banner", status: "Active" },
    { id: 2, name: "Sidebar Ad", type: "Video", status: "Active" },
  ];

  const performanceSummary = {
    totalImpressions: 500000,
    totalClicks: 25000,
    clickThroughRate: "5%",
  };

  const revenueSummary = {
    lastMonth: 1200,
    thisMonth: 1500,
    projectedNextMonth: 1800,
  };

  const requests = [
    { id: 1, date: "2024-03-01", type: "New Ad Zone", status: "Pending" },
    { id: 2, date: "2024-03-05", type: "Rate Adjustment", status: "Approved" },
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
              <Header as="h3">Ad Zones</Header>
              <List divided relaxed>
                {adZones.map((zone) => (
                  <List.Item key={zone.id}>
                    <List.Icon
                      name={zone.type === "Banner" ? "block layout" : "video"}
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header>{zone.name}</List.Header>
                      <List.Description>
                        Type: {zone.type} - Status: {zone.status}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
              <Button primary>Add New Ad Zone</Button>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as="h3">Performance Summary</Header>
              <Statistic size="small">
                <StatisticValue>
                  {performanceSummary.totalImpressions.toLocaleString()}
                </StatisticValue>
                <StatisticLabel>Total Impressions</StatisticLabel>
              </Statistic>
              <Statistic size="small">
                <StatisticValue>
                  {performanceSummary.totalClicks.toLocaleString()}
                </StatisticValue>
                <StatisticLabel>Total Clicks</StatisticLabel>
              </Statistic>
              <Statistic size="small">
                <StatisticValue>
                  {performanceSummary.clickThroughRate}
                </StatisticValue>
                <StatisticLabel>Click-Through Rate</StatisticLabel>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        {/* Revenue Reports */}
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment>
              <Header as="h3">Revenue Reports</Header>
              <Statistic.Group widths="three">
                <Statistic size="small">
                  <StatisticValue>${revenueSummary.lastMonth}</StatisticValue>
                  <StatisticLabel>Last Month</StatisticLabel>
                </Statistic>
                <Statistic size="small">
                  <StatisticValue>${revenueSummary.thisMonth}</StatisticValue>
                  <StatisticLabel>This Month</StatisticLabel>
                </Statistic>
                <Statistic size="small">
                  <StatisticValue>
                    ${revenueSummary.projectedNextMonth}
                  </StatisticValue>
                  <StatisticLabel>Projected Next Month</StatisticLabel>
                </Statistic>
              </Statistic.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>

        {/* Request & Inquiries */}
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment>
              <Header as="h3">Requests & Inquiries</Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {requests.map((request) => (
                    <Table.Row key={request.id}>
                      <Table.Cell>{request.id}</Table.Cell>
                      <Table.Cell>{request.date}</Table.Cell>
                      <Table.Cell>{request.type}</Table.Cell>
                      <Table.Cell>{request.status}</Table.Cell>
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

export default PublisherDashboard;
