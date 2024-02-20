import { Button, styled } from "@mui/material";

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 2),
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
}));

interface UploadButtonProps {
  handleSubmit: () => void;
  loading: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  handleSubmit,
  loading,
}) => {
  return (
    <ButtonStyled onClick={handleSubmit} disabled={loading}>
      Upload Image
    </ButtonStyled>
  );
};
