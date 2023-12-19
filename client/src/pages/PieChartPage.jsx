import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import PieChart from "../components/PieChart"; // Assume you have a PieChart component

const PieChartPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("topic"); // Default category

  useEffect(() => {
    fetch("http://localhost:5000/get-data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const preparePieChartData = () => {
    const countByCategory = data.reduce((acc, item) => {
      const key = item[selectedCategory];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const totalCount = Object.values(countByCategory).reduce(
      (a, b) => a + b,
      0
    );
    let otherCount = 0;
    const threshold = 0.04; // 5%
    const resultData = Object.entries(countByCategory)
      .filter(([key, value]) => {
        if (value / totalCount < threshold) {
          otherCount += value;
          return false;
        }
        return true;
      })
      .map(([key, value]) => ({ name: key, value }));

    if (otherCount > 0) {
      resultData.push({ name: "Other", value: otherCount });
    }

    return resultData;
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="topic">Topic</MenuItem>
              <MenuItem value="sector">Sector</MenuItem>
              <MenuItem value="region">Region</MenuItem>
              <MenuItem value="country">Country</MenuItem>
              <MenuItem value="pest">PEST</MenuItem>
              <MenuItem value="swot">SWOT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ padding: 16 }}>
            <PieChart data={preparePieChartData()} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PieChartPage;
