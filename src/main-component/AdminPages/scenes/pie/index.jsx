import { Box } from "@mui/material";
import Header from "/src/components/AdminComponents/components/Header.jsx";
import PieChart from "/src/components/AdminComponents/components/PieChart.jsx";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
