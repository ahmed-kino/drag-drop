import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography, styled } from "@mui/material";

const Dropzone = styled("div")(() => ({
  border: "2px dashed #ccc",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
}));

interface ImageDropzoneProps {
  onImageChange: (image: File) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageChange }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
      onImageChange(file);
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    return () => {
      // Clean up
      setImagePreview(null);
    };
  }, []);

  return (
    <Dropzone>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h5">Drop the image here...</Typography>
        ) : (
          <Typography variant="h5">
            Drag 'n' drop an image here, or click to select a file
          </Typography>
        )}
        {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{height: 600, width: 750}} />
        )}
      </div>
    </Dropzone>
  );
};

export default ImageDropzone;
