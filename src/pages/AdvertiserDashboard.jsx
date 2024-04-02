import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Grid, Button, Icon, Segment, Table } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import UserSidebar from "../components/UserSidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const clicksData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Clicks",
      data: [1200, 1900, 800, 1600, 2000, 1500],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const conversionRateData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Conversion Rate",
      data: [2.5, 3.8, 2.1, 3.4, 4.0, 3.2], // Assuming these are percentages
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// ...your existing data here...

const AdvertiserDashboard = () => {
  const { authData } = useAuth();

  return (
    <Grid style={{ padding: "20px" }}>
      <Grid.Column width={3}>
        <UserSidebar />
      </Grid.Column>

      <Grid.Column stretched width={10}>
        <Segment>
          <h1>Welcome, {authData.username}</h1>
        </Segment>

        {/* Campaign Overview Segment */}
        <Segment>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Campaign Overview</h2>
            <Button color="green">
              <Icon name="plus" />
              Create New Campaign
            </Button>
          </div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Campaign Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Impressions</Table.HeaderCell>
                <Table.HeaderCell>Clicks</Table.HeaderCell>
                <Table.HeaderCell>Conversions</Table.HeaderCell>
                <Table.HeaderCell>Budget</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* Replace this section with dynamic campaign data */}
              <Table.Row>
                <Table.Cell>Example Campaign</Table.Cell>
                <Table.Cell>Active</Table.Cell>
                <Table.Cell>10,000</Table.Cell>
                <Table.Cell>500</Table.Cell>
                <Table.Cell>50</Table.Cell>
                <Table.Cell>$1000</Table.Cell>
                <Table.Cell>
                  <Button size="small">Edit</Button>
                  <Button size="small">Pause</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>

        {/* Performance Analytics Segment */}
        <Segment>
          <h2>Performance Analytics</h2>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <h4>Clicks Over Time</h4>
                <Line data={clicksData} />
              </Grid.Column>
              <Grid.Column width={8}>
                <h4>Conversion Rate Over Time</h4>
                <Bar data={conversionRateData} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        {/* Budget Management Segment */}
        <Segment>
          <h2>Budget Management</h2>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Campaign Name</Table.HeaderCell>
                <Table.HeaderCell>Total Budget</Table.HeaderCell>
                <Table.HeaderCell>Spent</Table.HeaderCell>
                <Table.HeaderCell>Remaining</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* Replace this section with dynamic budget data */}
              <Table.Row>
                <Table.Cell>Example Campaign</Table.Cell>
                <Table.Cell>$1000</Table.Cell>
                <Table.Cell>$800</Table.Cell>
                <Table.Cell>$200</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>

        {/* Account Settings and Quick Actions can be added here */}
        <Segment>
          <h2>Account Settings</h2>
          <Button icon labelPosition="left" primary>
            <Icon name="settings" />
            Edit Profile
          </Button>
          <Button icon labelPosition="left">
            <Icon name="credit card" />
            Payment Methods
          </Button>
          {/* More account settings options */}
        </Segment>
        <Segment>
          <h2>Some Other Settings Or Whatever</h2>
          <Button icon labelPosition="left" primary>
            <Icon name="settings" />
            Edit Profile
          </Button>
          <Button icon labelPosition="left">
            <Icon name="credit card" />
            Payment Methods
          </Button>
          {/* More account settings options */}
        </Segment>
        <Segment>
          <h2>Other Settings</h2>
          <Button icon labelPosition="left" primary>
            <Icon name="settings" />
            Edit Profile
          </Button>
          <Button icon labelPosition="left">
            <Icon name="credit card" />
            Payment Methods
          </Button>
          {/* More account settings options if you want */}
        </Segment>
        {/* More segments can be added here */}
      </Grid.Column>

      {/* Right Sidebar for Notifications */}
      <Grid.Column width={3}>
        <div
          style={{ position: "-webkit-sticky", position: "sticky", top: 20 }}
        >
          <Segment>
            <h2>Notifications</h2>
            <p>Your campaign "Example Campaign" is nearing its budget limit.</p>
            <p>Your campaign "Example Campaign" is nearing its budget limit.</p>
            <p>Your campaign "Example Campaign" is nearing its budget limit.</p>

            {/* More notifications */}
          </Segment>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default AdvertiserDashboard;
