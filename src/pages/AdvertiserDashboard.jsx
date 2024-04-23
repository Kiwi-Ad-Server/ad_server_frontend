// Import necessary components and hooks
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Button, Grid, Icon, Popup, Segment } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import AS_MODAL from "../shared/AS_MODAL";
import AS_TABLE from "../shared/AS_TABLE";
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

// Register Chart.js components
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

// columns configuration for the table
const columns = [
  {
    title: "Campaign Name",
    dataIndex: "name",
    key: "name",
    searchable: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Impressions",
    dataIndex: "impressions",
    key: "impressions",
    sortable: true,
  },
  {
    title: "Clicks",
    dataIndex: "clicks",
    key: "clicks",
  },
  {
    title: "Conversions",
    dataIndex: "conversions",
    key: "conversions",
  },
  {
    title: "Budget(N$)",
    dataIndex: "budget",
    key: "budget",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Button.Group size="small">
        <Popup
          content="Pause campaign"
          trigger={<Button icon="pause" />}
          size="small"
          position="top left"
        />
        <Popup
          content="Edit campaign"
          trigger={<Button icon="edit" />}
          size="small"
          position="top center"
        />
        <Popup
          content="Delete campaign"
          trigger={<Button icon="trash" />}
          size="small"
          position="top right"
        />
      </Button.Group>
    ),
  },
];

const AdvertiserDashboard = () => {
  // State and hooks
  const apiService = new APIService();
  const { authData } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [adPlacementOptions, setAdPlacementOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clicksData, setClicksData] = useState({ labels: [], datasets: [] });
  const [conversionRateData, setConversionRateData] = useState({
    labels: [],
    datasets: [],
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    fetchAdPlacements();
    fetchPerformanceData();
  }, []);

  // Function to fetch campaigns data
  // const fetchData = async () => {
  //   try {
  //     // Set loading state to true
  //     setCampaigns([]);
  //     // Fetch data from API service
  //     const data = await apiService.fetchData("campaigns");

  //     setCampaigns(data);
  //   } catch (error) {
  //     console.error("Error fetching campaigns:", error);
  //   }
  // };

  const fetchData = async () => {
    try {
      setCampaigns([]);
      const campaignsData = await apiService.fetchData("campaigns");
      setCampaigns(campaignsData);

      // Fetch clicks and conversion rate data for the first campaign 
      if (campaignsData.length > 0) {
        const campaignId = campaignsData[0]._id;
        const clicks = await apiService.fetchData(
          `campaigns/clicks/${campaignId}`
        );
        const conversionRate = await apiService.fetchData(
          `campaigns/${campaignId}/conversion-rate`
        );
        setClicksData(clicks);
        setConversionRateData(conversionRate);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch ad placements data
  const fetchAdPlacements = async () => {
    try {
      const response = await apiService.fetchData("ad-placements");
      const options = response.map((placement) => ({
        key: placement._id,
        text: placement.name,
        value: placement._id,
      }));
      setAdPlacementOptions(options);
    } catch (error) {
      console.error("Error fetching ad placements:", error);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      // Fetch actual clicks data from the API
      const clicksResponse = await apiService.fetchData("campaigns/clicks");
      const clicksChartData = {
        labels: clicksResponse.map((item) => item.month),
        datasets: [
          {
            label: "Clicks",
            data: clicksResponse.map((item) => item.clicks),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      setClicksData(clicksChartData);

      // Fetch actual conversion rate data from the API
      const conversionRateResponse = await apiService.fetchData(
        "conversion-rate"
      );
      const conversionRateChartData = {
        labels: conversionRateResponse.map((item) => item.month),
        datasets: [
          {
            label: "Conversion Rate",
            data: conversionRateResponse.map((item) => item.conversionRate),
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
      setConversionRateData(conversionRateChartData);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };
  // create new campaign
  const handleCreateCampaign = async (campaignData) => {
    try {
      // Post campaign data to API service
      await apiService.postData("campaigns", campaignData);
      // Close the modal
      setIsModalOpen(false);
      // Fetch updated data after creating a new campaign
      fetchData();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  //  open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  //  close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppLayout>
      <Grid style={{ padding: "10px" }}>
        {/* Center Sidebar */}
        <Grid.Column width={12}>
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
              <div>
                {/* Refresh button with a popup */}
                <Popup
                  content="Refresh table"
                  trigger={<Button icon="refresh" onClick={fetchData} />}
                  size="mini"
                />
                {/* Button to open modal for creating a new campaign */}
                <Button color="green" onClick={openModal}>
                  <Icon name="plus" />
                  Create New Campaign
                </Button>
              </div>
            </div>

            {/* Campaign table */}
            <Segment>
              <AS_TABLE
                rowKey="id"
                columns={columns}
                dataSource={
                  campaigns &&
                  campaigns.map((campaign) => ({
                    ...campaign,
                    key: campaign._id,
                  }))
                }
                // Show loading spinner while data is being fetched
                loading={!campaigns.length}
                // Responsive table
                responsive
              />
            </Segment>
          </Segment>

          {/* Performance Analytics Segment */}
          <Segment>
            <h2>Performance Analytics</h2>
            <Grid>
              <Grid.Row>
                <Grid.Column width={8}>
                  {/* Chart for Clicks Over Time */}
                  <h4>Clicks Over Time</h4>
                  {clicksData && <Line data={clicksData} />}
                </Grid.Column>
                <Grid.Column width={8}>
                  {/* Chart for Conversion Rate Over Time */}
                  <h4>Conversion Rate Over Time</h4>
                  {conversionRateData && <Bar data={conversionRateData} />}
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
              {/* Placeholder notifications */}
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

        {/* Modal for creating a new campaign */}
        <AS_MODAL
          open={isModalOpen}
          onClose={closeModal}
          header="Create New Campaign"
          content={
            <CampaignForm
              handleSubmit={handleCreateCampaign}
              onClose={closeModal}
              adPlacementOptions={adPlacementOptions}
            />
          }
          handleCreateCampaign={handleCreateCampaign}
        />
      </Grid>
    </AppLayout>
  );
};

export default AdvertiserDashboard;
