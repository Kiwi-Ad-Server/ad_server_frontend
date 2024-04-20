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
  Form,
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link

function PublisherDashboard() {
  const { authData } = useAuth();
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Mock data for ad zones and performance
  const adZones = [
    { id: 1, name: "Homepage Banner", type: "Banner", status: "Active" },
    { id: 2, name: "Sidebar Ad", type: "Video", status: "Active" },
  ];

   // Function to handle the "Add New Ad Zone" button click
 const handleAddNewAdZone = () => {
  setShowForm(!showForm); // Toggle form visibility
};

const handleFormSubmit = (newRequest) => {
  requests(prevRequests => [...prevRequests, newRequest]);
  setShowForm(false);
};

const AdZoneForm = () => (
  <Form onSubmit={(e) => {
    e.preventDefault();
    const newRequest = {
      id: requests.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: "New Ad Zone",
      status: "Pending",
    };
    handleFormSubmit(newRequest);
  }}>
    <Form.Field>
      <label>Name</label>
      <input placeholder="Enter Ad Zone Name"  />
      <label>Type</label>
      <input placeholder="Banner"/>
      <label>Website Name</label>
      <input placeholder="Foodie Tips" />

    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

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
               {/* Add the link to the Publisher Dashboard */}
               <Link to="/admin-dashboard">Go to Admin Dashboard</Link>
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
              <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header as="h3">Ad Zones</Header>
              <List divided relaxed>
                {/* Your existing List of ad zones... */}
              </List>
              <Button primary onClick={handleAddNewAdZone}>Add New Ad Zone</Button>
              {showForm && <AdZoneForm />}
            </Segment>
          </Grid.Column>
        </Grid.Row>

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
