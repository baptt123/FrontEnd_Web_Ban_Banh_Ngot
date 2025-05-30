import { Box } from "@mui/material";
import Header from "/src/components/AdminComponents/components/Header.jsx";
import LineChart from "/src/components/AdminComponents/components/LineChart.jsx";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
