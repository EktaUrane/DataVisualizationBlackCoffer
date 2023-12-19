import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, title, fillColor }) => {
  const d3Chart = useRef();
  const chartContainer = useRef();

  useEffect(() => {
    if (data && data.length) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const containerWidth = chartContainer.current.getBoundingClientRect().width;
    const margin = { top: 20, right: 20, bottom: 70, left: 40 }; // Increased bottom margin
    const width = containerWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(d3Chart.current).select("svg").remove();

    const svg = d3
      .select(d3Chart.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.name))
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", fillColor);
  };

  return (
    <div ref={chartContainer} style={{ width: "100%", height: "100%" }}>
      <h3>{title}</h3>
      <div ref={d3Chart}></div>
    </div>
  );
};

export default BarChart;
