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
import BarChart from "../components/BarChart";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [endYear, setEndYear] = useState("");
  const [topic, setTopic] = useState("");
  const [sector, setSector] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [xAxisAttribute, setXAxisAttribute] = useState("topic");

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

  const prepareChartData = (key, category) => {
    return data
      .filter((item) => !endYear || item.end_year === endYear)
      .filter((item) => !topic || item.topic === topic)
      .filter((item) => !sector || item.sector === sector)
      .filter((item) => !region || item.region === region)
      .filter((item) => !country || item.country === country)
      .map((item) => ({
        name: item[category || xAxisAttribute],
        value: item[key],
      }));
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  const uniqueValues = (key) =>
    Array.from(new Set(data.map((item) => item[key])));

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3} alignItems="center">
        {/* Filter Components */}
        {/* ... existing filter components ... */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              label="Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueValues("country").map((c, index) => (
                <MenuItem key={index} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              value={region}
              label="Region"
              onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueValues("region").map((r, index) => (
                <MenuItem key={index} value={r}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>X-Axis Attribute</InputLabel>
            <Select
              value={xAxisAttribute}
              label="X-Axis Attribute"
              onChange={(e) => setXAxisAttribute(e.target.value)}
            >
              <MenuItem value="topic">Topic</MenuItem>
              <MenuItem value="sector">Sector</MenuItem>
              <MenuItem value="end_year">End Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Intensity Chart */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <BarChart
              data={prepareChartData("intensity")}
              title="Intensity"
              fillColor="#30C4F3"
            />
          </Paper>
        </Grid>

        {/* Likelihood Chart */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <BarChart
              data={prepareChartData("likelihood")}
              title="Likelihood"
              fillColor="#FF5733"
            />
          </Paper>
        </Grid>

        {/* Relevance Chart */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <BarChart
              data={prepareChartData("relevance")}
              title="Relevance"
              fillColor="#69b3a2"
            />
          </Paper>
        </Grid>
        {/* Country */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <BarChart
              data={prepareChartData("intensity", "country")}
              title="Intensity by Country"
              fillColor="#00796b"
            />
          </Paper>
        </Grid>

        {/* Region */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <BarChart
              data={prepareChartData("intensity", "region")}
              title="Intensity by Region"
              fillColor="#5d4037"
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
