import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (data && data.length) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const width = 450,
      height = 450,
      margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select(ref.current)
      .html("")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);

    const dataReady = pie(data);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll("slices")
      .data(dataReady)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.name))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg
      .selectAll("slices")
      .data(dataReady)
      .join("text")
      .text((d) => d.data.name)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 15);
  };

  return <div ref={ref}></div>;
};

export default PieChart;
