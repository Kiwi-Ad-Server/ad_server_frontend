import React, { useState } from "react";
import { Form, Button, Modal, Dropdown, Grid } from "semantic-ui-react";

const CampaignDetailsForm = ({ onNext }) => {
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    objective: "",
    startDate: "",
    endDate: "",
    budget: 0,
  });

  // Dummy options for dropdown
  const objectiveOptions = [
    { key: "awareness", text: "Brand Awareness", value: "Brand Awareness" },
    { key: "lead_gen", text: "Lead Generation", value: "Lead Generation" },
    // Add more objectives as needed
  ];

  const handleChange = (e, { name, value }) => {
    setCampaignDetails({ ...campaignDetails, [name]: value });
  };

  const submitForm = () => {
    // Here you would handle the submission of the form
    // For this example, we'll just call onNext with our campaign details
    onNext(campaignDetails);
  };

  return (
    <Modal.Content>
      <Form>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                fluid
                // label="Campaign Name"
                placeholder="Campaign Name"
                name="name"
                value={campaignDetails.name}
                onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                fluid
                label="Objective"
                name="objective"
                placeholder="Select Campaign Objective"
                selection
                options={objectiveOptions}
                value={campaignDetails.objective}
                onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column>2</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>1</Grid.Column>
            <Grid.Column>2</Grid.Column>
            <Grid.Column>2</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Input
                type="date"
                label="Start Date"
                name="startDate"
                value={campaignDetails.startDate}
                onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              {" "}
              <Form.Input
                type="date"
                label="End Date"
                name="endDate"
                value={campaignDetails.endDate}
                onChange={handleChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                type="number"
                label="Budget"
                name="budget"
                value={campaignDetails.budget}
                onChange={handleChange}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button onClick={submitForm}>Next</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Modal.Content>
  );
};

export default CampaignDetailsForm;
