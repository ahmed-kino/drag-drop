import { Typography } from "@mui/material";

interface DataReceiverProps {
  data: Object | null;
}

const DataReceiver: React.FC<DataReceiverProps> = ({ data }) => {
  return (
    <Typography>
      {data && (
        <Typography>
          <h2>Data received:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Typography>
      )}
    </Typography>
  );
};

export default DataReceiver;
