import React, { useState } from "react";
import {
  Grid,
  Segment,
  Header,
  Button,
  List,
  Statistic,
  StatisticValue,
  StatisticLabel,
  Table,
  Modal,
  Dropdown,
  Message,
} from "semantic-ui-react";
import AppLayout from "../components/AppLayout";
import { useAuth } from "../context/AuthContext";

function PublisherDashboard() {
  const { authData } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [adType, setAdType] = useState("");
  const [placement, setPlacement] = useState("");
  const [adSize, setAdSize] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [adZones, setAdZones] = useState([]); // State for managing ad zones


  // Mock data for ad zones and performance

  const adTypes = [
    { key: "banner", text: "Banner", value: "banner" },
    { key: "poll", text: "Poll", value: "poll" },
    { key: "animation", text: "Animation", value: "animation" },
    { key: "video", text: "Video", value: "video" },
  ];

  const placements = [
    { key: "top", text: "Top", value: "top" },
    { key: "sidebar", text: "Sidebar", value: "sidebar" },
    { key: "bottom", text: "Bottom", value: "bottom" },
  ];

  const adSizes = [
    { key: "small", text: "Small", value: "small" },
    { key: "medium", text: "Medium", value: "medium" },
    { key: "large", text: "Large", value: "large" },
  ];

  const priceRanges = [
    { key: "low", text: "Low", value: "low" },
    { key: "medium", text: "Medium", value: "medium" },
    { key: "high", text: "High", value: "high" },
  ];

  const deviceTypes = [
    { key: "desktop", text: "Desktop", value: "desktop" },
    { key: "tablet", text: "Tablet", value: "tablet" },
    { key: "mobile", text: "Mobile", value: "mobile" },
  ];

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAdTypeChange = (event, { value }) => {
    setAdType(value);
  };

  const handlePlacementChange = (event, { value }) => {
    setPlacement(value);
  };

  const handleAdSizeChange = (event, { value }) => {
    setAdSize(value);
  };

  const handlePriceRangeChange = (event, { value }) => {
    setPriceRange(value);
  };

  const handleDeviceTypeChange = (event, { value }) => {
    setDeviceType(value);
  };

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

  // Function to generate code for ad placement
const generateCode = () => {
  if (!adType || !placement || !adSize || !priceRange || !deviceType) {
    setError("Please select all options.");
    setGeneratedCode(""); // Clear previous code if any
    return;
  }

  // Construct ad code based on selected options
  let adTypeCode;
  switch (adType) {
    case "banner":
      adTypeCode = '<div class="banner-ad">Banner Ad Content Here</div>';
      break;
    case "poll":
      adTypeCode = '<div class="poll-ad">Poll Ad Content Here</div>';
      break;
    case "animation":
      adTypeCode = '<div class="animation-ad">Animation Ad Content Here</div>';
      break;
    case "video":
      adTypeCode = '<div class="video-ad">Video Ad Content Here</div>';
      break;
    default:
      adTypeCode = "";
  }

  let placementCode;
  switch (placement) {
    case "top":
      placementCode = "Top";
      break;
    case "sidebar":
      placementCode = "Sidebar";
      break;
    case "bottom":
      placementCode = "Bottom";
      break;
    default:
      placementCode = "";
  }

  const adCode = `
    ${adTypeCode}
    <div>
      Your ad code for ${adType} at ${placementCode} with size ${adSize}, price range ${priceRange}, and device type ${deviceType}.
    </div>
 `;

  setGeneratedCode(adCode);
  setError("");

  const AdZones = {
    id: adZones.length + 1, // Incremental ID or use a unique ID generator
    name: `${adType} at ${placement}`, // Example: Banner at Top
    type: adType,
    status: "Active",
    adCode: adCode, // Store the generated ad code
  };
  setAdZones([...adZones, AdZones]);

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
            name={zone.type === "banner"
            ? "image outline"
            : zone.type === "poll"
            ? "chart bar outline"
            : zone.type === "animation"
            ? "sync alternate"
            : zone.type === "video"
            ? "play circle outline"
            : "question circle outline" // Default icon if type is unknown
        }
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
              {/* Add New Ad Zone Button */}
        <Grid.Row>
          <Grid.Column>
            <Button primary onClick={handleOpenModal}>
              Add New Ad Zone
            </Button>
            <Modal open={modalOpen} onClose={handleCloseModal} size="small">
              <Modal.Header>Select Ad Preferences</Modal.Header>
              <Modal.Content>
                <Dropdown
                  placeholder="Select Ad Type"
                  fluid
                  selection
                  options={adTypes}
                  onChange={handleAdTypeChange}
                />
                <Dropdown
                  placeholder="Select Placement"
                  fluid
                  selection
                  options={placements}
                  onChange={handlePlacementChange}
                />
                <Dropdown
                  placeholder="Select Ad Size"
                  fluid
                  selection
                  options={adSizes}
                  onChange={handleAdSizeChange}
                />
                <Dropdown
                  placeholder="Select Price Range"
                  fluid
                  selection
                  options={priceRanges}
                  onChange={handlePriceRangeChange}
                />
                <Dropdown
                  placeholder="Select Device Type"
                  fluid
                  selection
                  options={deviceTypes}
                  onChange={handleDeviceTypeChange}
                />
                <Button onClick={generateCode}>Generate Code</Button> {/* Button to generate the code */}
                {generatedCode && ( // Conditionally render the generated code
                  <Message positive>
                    <Message.Header>Generated Ad Code:</Message.Header>
                    <p>{generatedCode}</p>
                  </Message>
                )}
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button
                  positive
                  onClick={() => {
                    handleCloseModal();
      
                  }}
                >
                  Done
                </Button>
              </Modal.Actions>
            </Modal>
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
