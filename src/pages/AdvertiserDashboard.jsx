import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Grid, Button, Icon, Segment, Table } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { fetchCampaigns, createCampaign } from "../services/campaignService";
import AS_MODAL from "../shared/AS_MODAL";
import CampaignForm from "./Forms/CampaignForm";
import AppLayout from "../components/AppLayout";
import APIService from "../services/api.service";
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

const AdvertiserDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const apiService = new APIService("http://localhost:5000/api");
  const { authData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const subscription = apiService.subscribeToData("campaigns", setCampaigns);
    return () => subscription.unsubscribe();
  }, []);

  const handleCreateCampaign = async (campaignData) => {
    try {
      // Call the createCampaign service function
      await createCampaign(campaignData);

      // Refetch campaigns to update the list
      const updatedCampaigns = await fetchCampaigns();
      setCampaigns(updatedCampaigns);

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating campaign:", error);
      // Handle error (e.g., show error message)
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppLayout>
        <Grid style={{ padding: "10px" }}>
          {/* Center Sidebar  */}
          <Grid.Column stretched width={12}>
            <Segment>
              <h1>
                Welcome,{" "}
                {authData.username.charAt(0).toUpperCase() +
                  authData.username.slice(1)}
              </h1>
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
                <Button color="green" onClick={openModal}>
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
                    <Table.HeaderCell>Budget(N$)</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {/* Replace this section with dynamic campaign data */}
                  {campaigns.map((campaign) => (
                    <Table.Row key={campaign._id}>
                      <Table.Cell>{campaign.name}</Table.Cell>

                      <Table.Cell>{campaign.status}</Table.Cell>
                      <Table.Cell>{campaign.impressions}</Table.Cell>
                      <Table.Cell>{campaign.clicks}</Table.Cell>
                      <Table.Cell>{campaign.conversions}</Table.Cell>
                      <Table.Cell>{campaign.budget}</Table.Cell>
                      <Table.Cell>
                        <Button size="small">Edit</Button>
                        <Button size="small">Pause</Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
          </Grid.Column>

          {/* Right Sidebar */}
          <Grid.Column width={4}>
            <div
              style={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 70,
              }}
            >
              <Segment>
                <h2>Notifications</h2>
                <p>
                  Your campaign "Example Campaign" is nearing its budget limit.
                </p>
                <p>
                  Your campaign "Example Campaign" is nearing its budget limit.
                </p>
                <p>
                  Your campaign "Example Campaign" is nearing its budget limit.
                </p>

                {/* More notifications */}
              </Segment>
            </div>
          </Grid.Column>
          <AS_MODAL
            open={isModalOpen}
            onClose={closeModal}
            header="Create New Campaign"
            content={<CampaignForm handleSubmit={handleCreateCampaign} />}
            handleCreateCampaign={handleCreateCampaign}
          />
        </Grid>
      </AppLayout>
    </>
  );
};

export default AdvertiserDashboard;
