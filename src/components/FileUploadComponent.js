import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import storage from "../services/firebase";
import { Form, Input } from "semantic-ui-react";
import { message } from "antd";

const FileUploadComponent = ({ onFileUploaded }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      message.error("Please select a file.");
      return;
    }

    setUploading(true);

    const storageRef = ref(storage);
    const fileRef = ref(storageRef, file.name);

    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("File uploaded successfully");
        snapshot.ref.getDownloadURL().then((url) => {
          onFileUploaded(url);
          message.success("File uploaded successfully.");
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        message.error("File upload failed. Please try again.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <Form>
      <Form.Input label="Choose Ad Image" fluid type="file" onChange={handleFileChange} />
    </Form>
  );
};

export default FileUploadComponent;
