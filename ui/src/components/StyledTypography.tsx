import { Typography, styled } from "@mui/material";

import React from "react";

const STypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledTypography: React.FC<{ text: string }> = ({ text }) => {
  return <STypography variant="body1">{text}</STypography>;
};

export default StyledTypography;
