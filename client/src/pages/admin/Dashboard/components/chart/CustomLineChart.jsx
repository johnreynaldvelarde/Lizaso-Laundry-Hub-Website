import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

class CustomLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <Box
        sx={{
          height: { xs: "380px", md: "100%" },
        }}
      >
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="line"
          width="100%"
          height="90%"
        />
      </Box>
    );
  }
}

export default CustomLineChart;
