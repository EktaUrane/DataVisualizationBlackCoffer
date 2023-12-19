import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LineChart from "../components/LineChart";

const LineChartPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("intensity");

  useEffect(() => {
    fetch("http://localhost:5000/get-data")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          date: new Date(item.date),
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Metric</InputLabel>
            <Select
              value={selectedMetric}
              label="Metric"
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <MenuItem value="intensity">Intensity</MenuItem>
              <MenuItem value="likelihood">Likelihood</MenuItem>
              <MenuItem value="relevance">Relevance</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <LineChart
              data={data.filter((item) => item[selectedMetric] != null)}
              metric={selectedMetric}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default LineChartPage;
