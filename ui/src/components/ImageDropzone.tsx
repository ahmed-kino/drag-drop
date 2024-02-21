import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, styled, CircularProgress } from "@mui/material";
import DataReceiver from "./DataReceiver";
import StyledTypography from "./StyledTypography";
import { UploadButton } from "./UploadButton";
import ErrorBanner from "./ErrorBanner";

const DropzoneContainer = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "5px",
  textAlign: "center",
  cursor: "pointer",
  border: "2px dashed #ccc",
}));

const ImageDropzone: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [receivedData, setReceivedData] = useState(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [openErrorBanner, setOpenErrorBanner] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImagePreview(URL.createObjectURL(file));
    setFilename(file.name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!imagePreview) return;

    try {
      const response = await fetch(imagePreview);
      setLoading(true);
      const blob = await response.blob();
      const filename = imagePreview.substring(
        imagePreview.lastIndexOf("/") + 1
      );

      const formData = new FormData();
      formData.append("passport", blob, filename);

      const uploadResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/upload/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json();
        setErrorMessage(`${error.errors}`);
        setOpenErrorBanner(true);
        setLoading(false);
      } else {
        const data = await uploadResponse.json();

        setReceivedData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage(`${error}`);
      setOpenErrorBanner(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setImagePreview(null);
    };
  }, []);

  const handleCloseErrorBanner = () => {
    setOpenErrorBanner(false);
    setImagePreview(null);
    setReceivedData(null);
  };

  return (
    <>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h5">Drop the image here...</Typography>
        ) : (
          <Typography variant="h5">
            Drag 'n' drop an image here, or click to select a file
          </Typography>
        )}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ height: 600, width: 750 }}
          />
        )}
      </DropzoneContainer>
      {filename ? (
        <StyledTypography text={`filename: ${filename}`} />
      ) : (
        <StyledTypography text="No filed uploaded yet" />
      )}
      <UploadButton handleSubmit={handleSubmit} loading={loading} />
      {loading && <CircularProgress />}
      <ErrorBanner
        open={openErrorBanner}
        onClose={handleCloseErrorBanner}
        errorMessage={errorMessage}
      />
      {receivedData && <DataReceiver data={receivedData} />}
    </>
  );
};

export default ImageDropzone;
