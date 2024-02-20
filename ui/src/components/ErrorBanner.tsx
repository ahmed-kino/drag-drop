import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorBannerProps {
  open: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  open,
  onClose,
  errorMessage,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorBanner;
