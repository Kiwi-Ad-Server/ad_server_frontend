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
      </Grid>
    </AppLayout>
  );
}

export default PublisherDashboard;
