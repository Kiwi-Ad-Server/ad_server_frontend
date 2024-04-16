import React, { useState } from "react";
import { Form, Button, Modal, Grid } from "semantic-ui-react";
import AS_NOTIFY from "../../shared/AS_NOTIFY";
import APIService from "../../services/api.service";

const objectiveOptions = [
  { key: "awareness", text: "Brand Awareness", value: "Brand Awareness" },
  { key: "web_traffic", text: "Website traffic", value: "Website traffic" },
  { key: "lead_gen", text: "Lead Generation", value: "Lead Generation" },
  { key: "education", text: "Education", value: "Education" },
];

const CampaignDetailsForm = ({ onClose }) => {
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    objective: "",
    startDate: "",
    endDate: "",
    budget: 0,
    ageRange: "",
    interests: "",
    duration: { start: "", end: "" },
  });

  const apiService = new APIService();

  const handleChange = (e, { name, value }) => {
    setCampaignDetails({ ...campaignDetails, [name]: value });
  };

  const submitForm = async () => {
    try {
      await apiService.postData("campaigns", {
        ...campaignDetails,
        interests: campaignDetails.interests.split(","),
      });
      AS_NOTIFY("success", "Campaigns successfully created");
      onClose();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <Modal.Content>
      <Form onSubmit={submitForm}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Input
                fluid
                label="Campaign Name"
                name="name"
                value={campaignDetails.name}
                onChange={handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Dropdown
                fluid
                label="Objective"
                name="objective"
                scrolling
                placeholder="Select Campaign Objective"
                selection
                options={objectiveOptions}
                value={campaignDetails.objective}
                onChange={handleChange}
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Group widths="equal">
                <Form.Input
                  type="date"
                  label="Start Date"
                  name="startDate"
                  value={campaignDetails.startDate}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  type="date"
                  label="End Date"
                  name="endDate"
                  value={campaignDetails.endDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                type="number"
                label="Budget"
                name="budget"
                value={campaignDetails.budget}
                onChange={handleChange}
                required
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Input
                fluid
                label="Age Range"
                name="ageRange"
                value={campaignDetails.ageRange}
                onChange={handleChange}
                placeholder="e.g., 18-24"
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                fluid
                label="Interests (comma-separated)"
                name="interests"
                value={campaignDetails.interests}
                onChange={handleChange}
                placeholder="e.g., sports, music"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="right">
              <Button type="submit" color="green">
                Create Campaign
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Modal.Content>
  );
};

export default CampaignDetailsForm;
