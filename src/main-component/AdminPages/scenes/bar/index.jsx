import { Box } from "@mui/material";
import Header from "/src/components/AdminComponents/components/Header.jsx";
import BarChart from "/src/components/AdminComponents/components/BarChart.jsx";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
